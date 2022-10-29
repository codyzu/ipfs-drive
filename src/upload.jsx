import React, {useEffect, useState} from 'react';
import {useUploader, UploaderProvider} from '@w3ui/react-uploader';
import {useUploadsList} from '@w3ui/react-uploads-list';
import clsx from 'clsx';
import Cid from './cid';

/* eslint-disable react/prop-types */
function Upload({file}) {
  const [{uploadedCarChunks}, {uploadFile}] = useUploader();
  const {reload} = useUploadsList();
  const [error, setError] = useState();
  const [cid, setCid] = useState();

  useEffect(() => {
    console.log('Uploading', file.name);
    upload();

    async function upload() {
      try {
        const cid = await uploadFile(file);
        console.log('Uploaded', file.name, 'CID:', cid.toString());
        setCid(cid);
        // Reload the uploads list
        reload();
      } catch (uploadError) {
        setError(uploadError);
      }
    }
  }, [file]);

  const color = error ? 'bg-red-200' : cid ? 'bg-green-200' : 'bg-yellow-200';
  const inProgress = !error && !cid;

  return (
    <div
      className={clsx(color, 'rounded-xl m-2 p-4 w-[160px] h-[160px]')}
      title={cid || ''}
    >
      <div className="flex flex-row items-center text-lg">
        <div className="i-lucide-file inline-block m-r-1 flex-shrink-0" />
        <div className="flex-shrink-1">{file.name}</div>
      </div>
      {uploadedCarChunks.map(({cid, size}) => (
        <div key={cid.toString()}>
          <Cid cid={cid} />
          <span className="font-mono">{size}</span> bytes
        </div>
      ))}
      {inProgress && (
        <div className="flex flex-row w-full justify-center">
          <div className="i-lucide-loader-2 animate-spin w-[40px] h-[40px]" />
        </div>
      )}
      {error && <div>{error.toString()}</div>}
    </div>
  );
}

export default function UploadWithProvider({file}) {
  return (
    <UploaderProvider>
      <Upload file={file} />
    </UploaderProvider>
  );
}
/* eslint-enable react/prop-types */
