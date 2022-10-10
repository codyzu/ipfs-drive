import React, {useState, useEffect, useCallback} from 'react';
import {useAuth, AuthStatus} from '@w3ui/react-wallet';
import {useUploadsList} from '@w3ui/react-uploads-list';
import {useUploader} from '@w3ui/react-uploader';
import {useDropzone} from 'react-dropzone';

function App() {
  const [email, setEmail] = useState('');
  const {
    loadDefaultIdentity,
    authStatus,
    identity,
    registerAndStoreIdentity,
    unloadAndRemoveIdentity,
  } = useAuth();

  useEffect(() => {
    console.log('loading identity');
    loadDefaultIdentity();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log('ID:', identity, 'AUTH STAT:', authStatus);
  }, [identity, authStatus]);

  const results = useUploadsList();
  console.log('R:', results);

  useEffect(() => {
    if (authStatus !== AuthStatus.SignedIn) {
      return;
    }

    setEmail(identity.email);

    console.log(identity.signingPrincipal.did());

    async function getUploads() {
      console.log('Refreshing uploads');
      const a = await results.reload();
      console.log(a);
    }

    getUploads();
  }, [identity, authStatus]);

  function onSubmit(event_) {
    event_.preventDefault();

    if (authStatus === AuthStatus.SignedIn) {
      unloadAndRemoveIdentity();
      return;
    }

    registerAndStoreIdentity(email);
  }

  const [progress, uploader] = useUploader();
  // Console.log('P', progress, 'U', uploader);

  const onDrop = useCallback(async (acceptedFiles) => {
    async function uploadFile(file) {
      console.log('Uploading file', file.path);
      const cid = await uploader.uploadFile(file);
      console.log('Uploaded! CID:', cid);
    }

    for (const file of acceptedFiles) {
      uploadFile(file);
    }
  }, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div className="font-sans text-black" xl="mx-auto max-w-xl">
      <div className="rounded-lg shadow p-2 my-2 border-none">
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="border-2 p-2 rounded-lg text-gray-700 font-bold invalid:text-red-800"
            value={email}
            disabled={authStatus !== AuthStatus.SignedOut}
            onChange={(event_) => setEmail(event_.target.value)}
          />
          <button
            type="submit"
            className="ml-2 rounded-lg text-white bg-gray-700 p-2"
          >
            {authStatus === AuthStatus.SignedIn ? 'Logout' : 'Login'}
          </button>
        </form>
      </div>
      <div
        {...getRootProps()}
        className="p-2 border-1 border-gray-500 rounded-lg hover:cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </div>
      <div className="bg-green rounded-xl">
        <div className="">Uploads</div>
        {results.data && results.data?.results?.length > 0 ? (
          <>
            {results.data.results.length} uploads
            {results.data.results.map(({dataCid}) => (
              <img key={dataCid} src={`https://w3s.link/ipfs/${dataCid}`} />
            ))}
          </>
        ) : (
          <>none</>
        )}
      </div>
    </div>
  );
}

export default App;
