<?php
/**
 * Luckys Promo contact form mail sender.
 *
 * Deployed to public_html/contact-send/send.php on Hostinger. Called via
 * fetch() from src/components/ContactForm.tsx. Mirrors the validation and
 * response shape of the old Next.js /api/contact route (ok:true / ok:false
 * + error), so the frontend needed no logic changes beyond the URL.
 *
 * The real SMTP credentials live OUTSIDE the web root entirely (see
 * config.php.example for the required constants) - never inside
 * public_html, so they're never reachable over HTTP under any server
 * misconfiguration. That file is created once by hand directly on the
 * server and is never part of the automated deploy.
 */

header('Content-Type: application/json');

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 max
const MAX_PHONE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 1000;
const RATE_LIMIT_SECONDS = 30; // min gap between submissions from the same IP

// Only accept POST.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

require __DIR__ . '/phpmailer/src/Exception.php';
require __DIR__ . '/phpmailer/src/PHPMailer.php';
require __DIR__ . '/phpmailer/src/SMTP.php';

// Outside the web root: public_html/contact-send/send.php -> account home
// -> contact-secrets/config.php. Adjust the relative depth here if the
// account's actual directory layout differs from the Hostinger default.
$configPath = __DIR__ . '/../../contact-secrets/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Email is not configured on the server']);
    exit;
}
require $configPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid request body']);
    exit;
}

// Honeypot: a field real users never see or fill in (hidden in the UI).
// If it has a value, this was almost certainly a bot - pretend success so
// it doesn't learn the field was a trap, but never actually send mail.
$honeypot = trim((string) ($body['website'] ?? ''));
if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

// Rate limit by IP: a plain file per IP, outside the web root, recording
// the last submission time. No database needed for this volume of traffic.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitDir = dirname($configPath) . '/rate-limit';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0700, true);
}
$rateLimitFile = $rateLimitDir . '/' . hash('sha256', $ip) . '.txt';
if (is_file($rateLimitFile) && (time() - (int) file_get_contents($rateLimitFile)) < RATE_LIMIT_SECONDS) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Please wait a moment before sending another message']);
    exit;
}

$name = trim((string) ($body['name'] ?? ''));
$email = trim((string) ($body['email'] ?? ''));
$phone = trim((string) ($body['phone'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

if (
    strlen($name) > MAX_NAME_LENGTH ||
    strlen($email) > MAX_EMAIL_LENGTH ||
    strlen($phone) > MAX_PHONE_LENGTH ||
    strlen($message) > MAX_MESSAGE_LENGTH
) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'One or more fields are too long']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

// Digits, spaces, and the usual phone punctuation only - permissive enough
// for international formats without accepting arbitrary text.
if (!preg_match('/^[0-9+\-\s()]{7,20}$/', $phone)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid phone number']);
    exit;
}

// Strip CRLF from any value that ends up in a mail header (name is used in
// the Subject line) to prevent header injection via the form fields.
$stripHeaderChars = static fn(string $value): string => str_replace(["\r", "\n"], '', $value);
$name = $stripHeaderChars($name);

if (!defined('SMTP_HOST') || !defined('SMTP_PORT') || !defined('SMTP_USER') || !defined('SMTP_PASSWORD')) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Email is not configured on the server']);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->Port = (int) SMTP_PORT;
    $mail->SMTPSecure = ((int) SMTP_PORT === 465) ? 'ssl' : 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASSWORD;

    $mail->setFrom(SMTP_USER, 'Luckys Promo Website');
    $mail->addAddress(defined('CONTACT_TO') ? CONTACT_TO : 'info@luckyspromo.com');
    $mail->addReplyTo($email, $name);

    $mail->Subject = "New enquiry from {$name} (via luckyspromo.com)";
    $mail->isHTML(false);
    $mail->Body = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\n\nMessage:\n{$message}";

    $mail->send();
    file_put_contents($rateLimitFile, (string) time());
    echo json_encode(['ok' => true]);
} catch (PHPMailerException $e) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Failed to send the message']);
}
