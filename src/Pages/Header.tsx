import { User } from 'firebase/auth';
import React from 'react';
import { signOut } from '../Firebase/Firebase';

export default function Header({
  photoURL,
  displayName,
}: {
  photoURL: string;
  displayName: string;
}) {
  return (
    <div className="flex items-center justify-between p-2 bg-blue-900 text-white">
      <div className="ml-2 text-lg">{displayName}</div>
      <img
        className="rounded-full w-[50px] h-[50px] object-cover"
        src={photoURL}
        alt={displayName}
      />
      <div onClick={() => signOut()} className="mr-2 font-bold cursor-pointer">
        Logout
      </div>
    </div>
  );
}
