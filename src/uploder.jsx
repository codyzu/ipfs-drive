import React, {useCallback} from 'react';
import {useUploader} from '@w3ui/react-uploader';
import {useDropzone} from 'react-dropzone';
import clsx from 'clsx';
import {useUploadsList} from '@w3ui/react-uploads-list';

export default function Uploader() {
  const [uploader] = useUploader();
  const {reload} = useUploadsList();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      async function uploadFile(file) {
        console.log('Uploading file', file.path);
        const cid = await uploader.uploadFile(file);
        console.log('Uploaded! CID:', cid);

        // Trigger a render of the uploads
        reload();
      }

      for (const file of acceptedFiles) {
        uploadFile(file);
      }
    },
    [uploader],
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
        <p>Drag files here or click to select files</p>
      )}
    </div>
  );
}
