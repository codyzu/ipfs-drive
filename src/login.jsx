import React, {useState, useEffect} from 'react';
import {useAuth, AuthStatus} from '@w3ui/react-wallet';
import clsx from 'clsx';

export default function Login() {
  const [email, setEmail] = useState('');

  const {
    loadDefaultIdentity,
    authStatus,
    identity,
    registerAndStoreIdentity,
    unloadAndRemoveIdentity,
    cancelRegisterAndStoreIdentity,
  } = useAuth();

  useEffect(() => {
    console.log('loading identity');
    loadDefaultIdentity();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (authStatus !== AuthStatus.SignedIn) {
      return;
    }

    setEmail(identity.email);
  }, [identity, authStatus]);

  function onSubmit(event_) {
    event_.preventDefault();

    if (authStatus === AuthStatus.SignedIn) {
      unloadAndRemoveIdentity();
      return;
    }

    if (authStatus === AuthStatus.EmailVerification) {
      cancelRegisterAndStoreIdentity();
      return;
    }

    registerAndStoreIdentity(email);
  }

  const icon =
    authStatus === AuthStatus.SignedIn
      ? 'i-lucide-log-out'
      : authStatus === AuthStatus.EmailVerification
      ? 'i-lucide-loader animate-spin'
      : 'i-lucide-log-in';

  const buttonText =
    authStatus === AuthStatus.SignedIn
      ? 'Logout'
      : authStatus === AuthStatus.EmailVerification
      ? 'Verify email'
      : 'Login';

  return (
    <div className="rounded-lg shadow p-5 border-none">
      <form onSubmit={onSubmit}>
        <div className="flex flex-row">
          <input
            type="email"
            className={clsx(
              'border-2 p-2 rounded-lg font-bold invalid:text-red-600 min-w-20 flex-grow-1 flex-shrink-1 transition-all duration-500 ease-linear',
              authStatus === AuthStatus.SignedOut
                ? 'text-gray-700'
                : 'text-gray-500',
            )}
            value={email}
            disabled={authStatus !== AuthStatus.SignedOut}
            onChange={(event_) => setEmail(event_.target.value)}
          />
          <button
            type="submit"
            className="ml-2 rounded-lg text-white bg-gray-700 p-2 transition-all duration-500 ease-linear"
          >
            <div className="flex flex-row items-center">
              <div>{buttonText}</div>
              <div
                className={`inline-block ml-2 w-[1.25rem] h-[1.25rem] ${icon}`}
              />
            </div>
          </button>
        </div>
      </form>
      {authStatus === AuthStatus.SignedIn && (
        <div className="mt-4 break-words">
          Signing principle: {identity.signingPrincipal.did()}
        </div>
      )}
    </div>
  );
}
