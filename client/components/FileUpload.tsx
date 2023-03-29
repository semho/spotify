import React, { useRef } from 'react';

interface IFileUploadProps {
  setFile: Function;
  accept: string;
  children?: React.ReactNode;
}

export default function FileUpload({
  setFile,
  accept,
  children,
}: IFileUploadProps) {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
  };

  return (
    <div
      onClick={() => ref.current?.click()}
      style={{ width: '100%', height: '100%' }}
    >
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
}
