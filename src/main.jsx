import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider} from '@w3ui/react-keyring';
import {UploadsListProvider} from '@w3ui/react-uploads-list';
import {UploaderProvider} from '@w3ui/react-uploader';
import App from './app';
import '@unocss/reset/tailwind.css';
import 'uno.css';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UploaderProvider>
        <UploadsListProvider>
          <App />
        </UploadsListProvider>
      </UploaderProvider>
    </AuthProvider>
  </React.StrictMode>,
);
