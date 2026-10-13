import React from 'react';

interface ManpointeLogoProps {
  className?: string;
}

export const ManpointeLogo: React.FC<ManpointeLogoProps> = ({
  className = "w-10 h-10",
}) => {
  return (
    <img
      src="/manpointe-icon.png"
      alt="Manpointe Official Logo"
      className={`${className} object-contain`}
    />
  );
};
