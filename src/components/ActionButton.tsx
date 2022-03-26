import React from 'react';

interface Props {
  className: string;
  text: string;
  onClick: () => void;
}

export default function ActionButton(props: Props) {
  return (
    <button
      className={
        'flex justify-center text-3xl items-center cursor-pointer hover:scale-110 transition-transform duration-600 ease-in-out shadow-lg shadow-gray-900 w-[70px] h-[70px] bg-green-600 text-white rounded-full ' +
        props.className
      }
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
