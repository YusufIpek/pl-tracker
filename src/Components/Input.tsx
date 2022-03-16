import React from 'react';

interface Props {
  className?: string;
  placeholder: string;
  type: string;
  required?: boolean;
  name: string;
}

export default function Input(props: Props) {
  return (
    <div>
      <input
        type={props.type}
        className={
          'shadow appearance-none border leading-8 rounded text-gray-700 p-3 focus:outline-blue-400 focus:shadow-outline w-full ' +
          props.className
        }
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
}
