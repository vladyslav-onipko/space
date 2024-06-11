import { useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';

import useAppDispatch from './hooks/app/app-dispatch';
import { autoLogin } from './store/user/auth/auth-actions';
import router from './router/router';

function App() {
  const initialized = useRef(true);
  const dispatch = useAppDispatch();

  if (initialized.current) {
    dispatch(autoLogin());
  }

  useEffect(() => {
    initialized.current = false;
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
