import React from 'react';

interface Props {
  className?: string;
  placeholder: string;
  type: string;
  required?: boolean;
  name: string;
  value?: Date | string;
  onChange?: (event?: any) => void;
}

export default function Input(props: Props) {
  const getValue = () => {
    if (props.value instanceof Date) {
      // date value has to be formated like: YYYY-MM-DDThh:mm
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
      const isoTime = props.value.toISOString();
      return isoTime.slice(0, isoTime.length - 1);
    }
    return props.value;
  };

  return (
    <div>
      <input
        type={props.type === 'datetime-local' ? 'text' : props.type}
        className={
          'bg-white shadow appearance-none border leading-8 rounded text-gray-700 p-3 focus:outline-blue-400 focus:shadow-outline w-full ' +
          props.className
        }
        name={props.name}
        onFocus={(event) => {
          if (props.type === 'datetime-local') {
            event.target.type = props.type;
          }
        }}
        onBlur={(event) => {
          if (props.type === 'datetime-local' && event.target.value === '') {
            event.target.type = 'text';
          }
        }}
        placeholder={props.placeholder}
        required={props.required}
        value={getValue()}
        onChange={props.onChange}
      />
    </div>
  );
}
