import React, {useState, useEffect, useRef} from 'react';
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
    if (authStatus !== AuthStatus.SignedOut) {
      return;
    }

    loadDefaultIdentity();
  }, [authStatus, loadDefaultIdentity]);

  // When loading the identity from storage, synchronize the email address
  useEffect(() => {
    if (authStatus !== AuthStatus.SignedIn) {
      return;
    }

    setEmail(identity.email);
  }, [identity, authStatus]);

  const emailRef = useRef();

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

  const message =
    authStatus === AuthStatus.SignedIn
      ? `Signing principle: ${identity.signingPrincipal.did()}`
      : authStatus === AuthStatus.EmailVerification
      ? 'Check your email to verify the login (can take a minute or two)...'
      : 'Login to upload new files and view existing uploads...';

  return (
    <div className="rounded-lg shadow p-5 border-none">
      <form onSubmit={onSubmit}>
        <div className="flex flex-row">
          <input
            ref={emailRef}
            type="email"
            className={clsx(
              'border-2 p-2 rounded-lg font-bold invalid:text-red-600 invalid:shadow-red-600 invalid:shadow-md min-w-20 flex-grow-1 flex-shrink-1 transition-all duration-500 ease-linear',
              authStatus === AuthStatus.SignedOut
                ? 'text-gray-700'
                : 'text-gray-500',
            )}
            value={email}
            disabled={authStatus !== AuthStatus.SignedOut}
            placeholder="your@email.com"
            onChange={(event_) => setEmail(event_.target.value)}
          />
          <button
            type="submit"
            className="ml-2 rounded-lg text-white bg-gray-700 p-2 transition-all duration-500 ease-linear"
            disabled={
              email.length === 0 ||
              (authStatus === AuthStatus.SignedOut &&
                !emailRef.current?.validity?.valid)
            }
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
      <div className="mt-4 break-words">{message}</div>
    </div>
  );
}
