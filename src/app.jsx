import React from 'react';
import {useAuth} from '@w3ui/react-wallet';
import Login from './login';
import Uploader from './uploder';
import Uploads from './uploads';

function App() {
  const {authStatus} = useAuth();

  return (
    <div
      className="font-sans text-black px-5 py-8"
      lg="mx-auto max-w-screen-lg"
    >
      <Login />
      <Uploader authStatus={authStatus} />
      <Uploads />
    </div>
  );
}

export default App;
