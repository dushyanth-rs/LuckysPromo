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
    return (
      <button
        type="button"
        onClick={() => {
          onNavigate?.();
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <Link href={`/#${id}`} onClick={onNavigate} className={className}>
      {children}
    </Link>
  );
};
