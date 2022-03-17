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
        'flex justify-center items-center cursor-pointer hover:bg-blue-800 hover:scale-110 transition-transform duration-600 ease-in-out active:shadow-xl shadow-gray-900 text-xl w-[50px] h-[50px] bg-blue-900 text-white rounded-full ' +
        props.className
      }
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
