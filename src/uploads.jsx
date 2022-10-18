import React, {useEffect, useState} from 'react';
import {useUploadsList} from '@w3ui/react-uploads-list';
import {useAuth, AuthStatus} from '@w3ui/react-wallet';

export default function Uploads() {
  const {authStatus} = useAuth();
  const {data, reload} = useUploadsList();
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (authStatus !== AuthStatus.SignedIn) {
      return;
    }

    reload();
  }, [authStatus]);

  useEffect(() => {
    if (!data?.results?.length) {
      setUploads([]);
      return;
    }

    const currentUploads = data.results.map((result) => ({
      ...result,
      isImage: false,
      url: `https://${result.dataCid}.ipfs.w3s.link`,
    }));

    // Set the uploads assuming there are no images
    setUploads(currentUploads);

    // Asynchronously check if each upload is an image
    for (const upload of currentUploads) {
      isImage(upload);
    }

    async function isImage(upload) {
      // Send a HEAD request so we can inspect the content-type header
      const result = await fetch(upload.url, {
        method: 'HEAD',
      });

      const contentType = result.headers.get('content-type');
      const type = contentType.split('/')[0].toLowerCase();
      const isImage = type === 'image';

      setUploads((previousUploads) => {
        const uploadIndex = previousUploads.findIndex(
          (existingUpload) => existingUpload.dataCid === upload.dataCid,
        );

        const nextUploads = [...previousUploads];

        // Only set the the isImage flag if we find the upload in the current prev state
        if (uploadIndex !== -1) {
          nextUploads[uploadIndex] = {...upload, isImage};
        }

        return nextUploads;
      });
    }
  }, [data]);

  // CSS adapted from https://css-tricks.com/adaptive-photo-layout-with-flexbox/
  return (
    <div className="flex flex-col rounded-lg shadow pt-5 mt-8">
      <div className="text-center text-xl">
        Uploads: {uploads.length > 0 ? `${uploads.length} total` : 'none'}
      </div>
      {authStatus === AuthStatus.SignedIn ? (
        <div className="flex flex-wrap media-short_portrait:flex-row mt-4">
          {uploads.map(({url, isImage, dataCid}) => {
            return (
              <div
                key={url}
                className="h-[40vh] flex-grow-1 media-portrait:h-[30vh] media-short:h-[80vh] media-short_portrait:h-auto media-short_portrait:w-[100%]"
              >
                <a key={url} href={url} title={`cid: ${dataCid}`}>
                  {isImage ? (
                    <img
                      src={url}
                      className="max-h-[100%] min-w-[100%] h-100% object-cover align-bottom media-short_portrait:w-[100%] media-short_portrait:max-h-[75vh] media-short_portrait:min-w-0"
                    />
                  ) : (
                    <div className="h-[100%] min-w-[40vh] bg-gray-200 p-4 media-short:min-w-0 media-short_portrait:w-[100%] media-short_portrait:max-h-[75vh] media-short_portrait:min-w-0">
                      <div className="border-3 rounded-xl border-gray-700 w-[100%] h-[100%] flex flex-col items-center justify-center">
                        <div className="i-lucide-folder-down w-[60px] h-[60px] text-gray-700" />
                        <div>
                          {dataCid.slice(0, 6)}...{dataCid.slice(-6)}
                        </div>
                      </div>
                    </div>
                  )}
                </a>
              </div>
            );
          })}
          <div className="h-[40vh] flex-grow-10" />
        </div>
      ) : (
        <div>Login to see uploads</div>
      )}
    </div>
  );
}
