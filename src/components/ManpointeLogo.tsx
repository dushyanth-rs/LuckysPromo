import React from 'react';
import manpointeIcon from '../assets/manpointe-icon.png';

interface ManpointeLogoProps {
  className?: string;
}

export const ManpointeLogo: React.FC<ManpointeLogoProps> = ({
  className = "w-10 h-10",
}) => {
  return (
    <img
      src={manpointeIcon}
      alt="Manpointe Official Logo"
      className={`${className} object-contain`}
    />
  );
};
