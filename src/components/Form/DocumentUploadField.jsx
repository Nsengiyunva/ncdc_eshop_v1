import React from 'react';

export const DocumentUploadField = (props) => {
  const { onChange, label, accept } = props;

  return (
    <>
      <label htmlFor="file-upload" className="block text-gray-700 text-sm font-bold">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        name="file"
        className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        onChange={onChange}
      />
    </>
  );
};
