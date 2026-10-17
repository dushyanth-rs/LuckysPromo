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

$name = trim((string) ($body['name'] ?? ''));
$email = trim((string) ($body['email'] ?? ''));
$phone = trim((string) ($body['phone'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
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
    echo json_encode(['ok' => true]);
} catch (PHPMailerException $e) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Failed to send the message']);
}
