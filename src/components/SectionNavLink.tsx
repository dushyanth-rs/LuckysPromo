'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SectionNavLinkProps {
  id: string;
  className?: string;
  onNavigate?: () => void;
  children: React.ReactNode;
}

export const SectionNavLink: React.FC<SectionNavLinkProps> = ({
  id,
  className,
  onNavigate,
  children,
}) => {
  const pathname = usePathname();

  if (pathname === '/') {
    // A plain anchor (not a <button> - a flex-display button renders its
    // content centered in some browsers) that also scrolls explicitly on
    // click, since relying on the browser's native same-page hash-scroll
    // isn't reliable here (Next's history.pushState-based URL update
    // doesn't always trigger it the way a full navigation would).
    return (
      <a
        href={`#${id}`}
        onClick={(e) => {
          const target = document.getElementById(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', `#${id}`);
            // Close the mobile drawer (onNavigate) only after the scroll
            // settles, not immediately: the drawer is inline in the sticky
            // header, not an overlay, so collapsing it mid-scroll shrinks
            // the header height and shifts the page under the in-progress
            // scroll animation - sometimes throwing off the landing
            // position, sometimes cancelling the scroll outright.
            if (onNavigate) {
              // Race a scrollend listener against a fixed timeout and fire
              // once, whichever comes first - scrollend is the accurate
              // signal when it fires, but isn't guaranteed to (unsupported
              // browsers, or a scroll so short no 'scroll' is ever
              // dispatched), so the timeout is a safety net, not the
              // primary path.
              let fired = false;
              const fire = () => {
                if (fired) return;
                fired = true;
                onNavigate();
              };
              window.addEventListener('scrollend', fire, { once: true });
              setTimeout(fire, 700);
            }
          } else {
            onNavigate?.();
          }
        }}
        className={className}
      >
        {children}
      </a>
    );
  }

  // From any other route, "/#id" goes through Next's router so it lands
  // on the home page already scrolled to the right section.
  return (
    <Link href={`/#${id}`} onClick={onNavigate} className={className}>
      {children}
    </Link>
  );
};
