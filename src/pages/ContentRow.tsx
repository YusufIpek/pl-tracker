import React from 'react';

interface Props {
  label: string;
  value: string | undefined;
}

export default function ContentRow(props: Props) {
  return (
    <div className="flex justify-between sm:block sm:m-auto px-8 py-1 sm:p-0">
      <div className="font-bold text-center">{props.label}</div>
      <div className="w-full text-right sm:text-center">{props.value}</div>
    </div>
  );
}
