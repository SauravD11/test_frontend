import { useEffect, useState } from 'react';
import { AuthStore } from '@vectord/utils';

import authApi from 'api/authApi';
import ErrorLayout from 'components/ErrorLayout';
import Loader from 'components/Loader';

function WithAuth({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAuthToken() {
      try {
        const jwt = await authApi.generateJwt();
        if (jwt) {
          AuthStore.setKey({ key: 'jwt', value: jwt });
          setLoggedIn(true);
        } else {
          throw new Error('JWT token not found!');
        }
      } catch (error) {
        console.log({ error });
        setError(error);
      }
    }

    const { jwt: currentJwt } = AuthStore.get();
    if (currentJwt) {
      setLoggedIn(true);
    } else {
      getAuthToken();
    }
  }, []);

  if (isLoggedIn) {
    return children;
  } else if (error) {
    return (
      <ErrorLayout
        title="Login Required!"
        message="Please login to continue"
        actionLabel="Log In"
        actionFn={() => window.open('/users/sign_in/', '_self')}
      />
    );
  } else {
    return <Loader />;
  }
}

export default WithAuth;
