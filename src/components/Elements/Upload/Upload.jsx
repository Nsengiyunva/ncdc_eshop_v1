import { Form } from 'components/Form';
import React, { useState } from 'react';
import { Image } from 'react-feather';

export const Upload = (props) => {
  const { title, subTitle, x, y, status, handleSubmit } = props;
  const [image, setImage] = useState({ preview: '', data: '' });

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <div className="App">
      <h1 className="text-center font-bold text-lg">{title}</h1>
      <div className="text-center">
        <span className="text-gray-500 text-sm">{subTitle}</span>
      </div>
      <Form id="create-post" onSubmit={handleSubmit}>
        {() => (
          <>
            {image.preview ? (
              <>
                <div className="border border-dotted rounded p-2 flex flex-col items-center justify-center">
                  <img src={image.preview} className="w-100" alt="uploaded to server" />
                </div>
              </>
            ) : (
              <div className="border border-dotted rounded p-10 flex flex-col items-center justify-center mt-4">
                <Image className="text-gray-300 h-20 w-20" />
                <span className="text-gray-500 text-sm">
                  {x} x {y} or higher recommended.
                </span>
                <label className="">
                  <span className="mt-2 text-base leading-normal">
                    <span className="text-red-500 cursor-pointer">Browse</span> for image.
                  </span>
                  <input type="file" name="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            )}
          </>
        )}
      </Form>
      {status && <h4>{status}</h4>}
    </div>
  );
};
