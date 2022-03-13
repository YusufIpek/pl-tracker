import React from 'react';
import { signOut } from '../Firebase/Firebase';

export default function Footer() {
  return (
    <div className="absolute flex bottom-0 h-[60px] bg-blue-900  w-full text-white">
      <div
        className="w-1/3 flex justify-center hover:bg-blue-600 items-center cursor-pointer"
        onClick={() => signOut()}
      >
        Logout
      </div>
    </div>
  );
}
