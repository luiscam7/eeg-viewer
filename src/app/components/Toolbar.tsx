import React from 'react';
import Image from 'next/image';
import '../styles/Toolbar.css'; 
import { StaticImageData } from 'next/image';


interface BrainWaveToolbarProps {
  userName: string;
  userImage: StaticImageData | string;
  logoPath: StaticImageData | string;
}

const BrainWaveToolbar: React.FC<BrainWaveToolbarProps> = ({ userName, userImage, logoPath }) => {
  return (
    <div className="toolbar-container px-4"> {/* Added 'px-4' for horizontal padding */}
      <div className="flex justify-between items-center">
          {/* Logo and title */}
          <div className="flex items-center space-x-2">
            <div className="relative w-20 h-12 shadow-md rounded-md">
              <Image src={logoPath} alt="BrainWave logo" layout="fill" objectFit="cover" className="rounded-md" />
            </div>
            <h1 className="toolbar-title">BrainWave</h1>
          </div>

          {/* Toolbar Items */}
          <div className="flex items-center space-x-4">
            {['Import EEG', 'Analyze', 'Save', 'Settings'].map(action => (
              <button 
                key={action}
                className="toolbar-button px-3 py-1"
              >
                {action}
              </button>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 shadow-md rounded-full">
              <Image src={userImage} alt="User Profile" layout="fill" objectFit="cover" className="rounded-full" />
            </div>
            <span className="toolbar-title">{userName}</span>
          </div>
      </div>
    </div>
  );
};


export default BrainWaveToolbar;
