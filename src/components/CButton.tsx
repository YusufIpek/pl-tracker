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
          'fixed bottom-0 left-0 sm:relative sm:mt-5 w-full h-[50px] bg-green-600 p-2 text-white sm:rounded-md hover:bg-green-500 ' +
          props.className
        }
      >
        {props.text}
      </button>
    </div>
  );
}
