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
    <div className={`toolbar-container px-4 shadow-lg dark:shadow-none dark:ring-1 dark:ring-gray-500`}>
      {/* Logo Section */}
      {/* Logo and title */}
      <div className="relative w-8 h-8 shadow-md rounded-md">
        <Image src={logoPath} alt="BrainWave logo" layout="fill" objectFit="cover" className="rounded-full" />
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">BrainWave</a>
      </div>

      {/* Toolbar Items */}
      <div className="flex-none gap-2">
        {['Import EEG', 'Analyze', 'Save', 'Settings'].map(action => (
          <button 
            key={action}
            className="btn btn-ghost normal-case text-xl"
          >
            {action}
          </button>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src={userImage} alt="User Profile" layout="fill" objectFit="cover" className="rounded-full" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li><a>{userName}</a></li>
            {/* Add other user related links if needed */}
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};



export default BrainWaveToolbar;
