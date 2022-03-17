import React from 'react';

interface Props {
  text: string;
  className?: string;
}

export default function (props: Props) {
  return (
    <div className="text-center">
      <button
        className={
          'w-full h-[50px] bg-green-600 p-2 text-white rounded-md hover:bg-green-500 ' +
          props.className
        }
      >
        {props.text}
      </button>
    </div>
  );
}
