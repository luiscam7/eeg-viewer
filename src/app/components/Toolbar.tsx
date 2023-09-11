import React from 'react';
import Image from 'next/image';
import '../styles/Toolbar.css'; 
import { StaticImageData } from 'next/image';

interface CerebroToolbarProps {
  userName: string;
  userImage: StaticImageData | string;
  logoPath: StaticImageData | string;
}

const CerebroToolbar: React.FC<CerebroToolbarProps> = ({ userName, userImage, logoPath }) => {
  return (
    <div className="toolbar-container w-full px-4 shadow-lg dark:ring-1 dark:ring-gray-500">
      
      {/* Logo and title */}
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 shadow-md rounded-full">
          <Image src={logoPath} alt="Cerebro logo" layout="fill" objectFit="cover" className="rounded-full" />
        </div>
        <a className="btn btn-ghost normal-case text-xl toolbar-button">Cerebro</a>
      </div>

      {/* Toolbar Items */}
      <div className="flex gap-2">
        {['Import EEG', 'Analyze', 'Settings'].map(action => (
          <button 
            key={action}
            className="btn btn-ghost normal-case text-xl toolbar-button"
          >
            {action}
          </button>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar toolbar-button">
            <div className="w-10 rounded-full">
              <Image src={userImage} alt="User Profile" layout="fill" objectFit="cover" className="rounded-full" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-full w-52">
            <li><a>{userName}</a></li>
            {/* Add other user related links if needed */}
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default CerebroToolbar;
