import React from 'react';
import { signInWithGoogle } from '../firebase/Firebase';

export default function Login() {
  return (
    <div className="w-full h-screen	flex flex-col justify-center items-center">
      <h1 className="text-lg">Nachhilfe Tracker</h1>
      <img
        onClick={() => signInWithGoogle()}
        src="/google_sign_in.png"
        alt="Google Login"
        className="h-[50px] mt-10 cursor-pointer"
      />
    </div>
  );
}
