import { User } from 'firebase/auth';
import React from 'react';

export default function Header({
  photoURL,
  displayName,
}: {
  photoURL: string;
  displayName: string;
}) {
  return (
    <div className="flex justify-end m-1">
      <img
        className="rounded-full w-[50px] h-[50px] object-cover"
        src={photoURL}
        alt={displayName}
      />
    </div>
  );
}
