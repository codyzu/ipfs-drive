import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import clsx from 'clsx';
import UploadWithProvider from './upload';

export default function Uploader() {
  const [uploads, setUploads] = useState([]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const timestamp = new Date();
      setUploads((previousUploads) => [
        ...previousUploads,
        ...acceptedFiles.map((file) => ({file, timestamp})),
      ]);
    },
    [setUploads],
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'rounded-lg shadow p-5 pt-2rem mt-8 border-none hover:cursor-pointer flex flex-col items-center',
        isDragActive && 'bg-gray-200',
      )}
    >
      <input {...getInputProps()} />
      <div
        className={clsx(
          `i-lucide-upload-cloud h-4rem w-4rem animate-bounce text-gray-700`,
          isDragActive ? 'animate-duration-300' : 'animate-duration-1000',
        )}
      />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Upload by dragging files here or click to select files</p>
      )}
      <div className="flex flex-row flex-wrap">
        {uploads.map((upload) => (
          <UploadWithProvider
            key={`${upload.file.name}-${upload.timestamp}`}
            file={upload.file}
          />
        ))}
      </div>
    </div>
  );
}
