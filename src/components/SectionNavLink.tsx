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
          onNavigate?.();
          const target = document.getElementById(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', `#${id}`);
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
