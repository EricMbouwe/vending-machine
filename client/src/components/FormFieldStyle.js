import React from 'react';

function FormFieldStyle(props) {
  return (
    <input
      className="w-full text-xs outline-none border-[1px] rounded-[4px] py-2 px-4 bg-blue-50"
      {...props}
    />
  );
}

export default FormFieldStyle;
