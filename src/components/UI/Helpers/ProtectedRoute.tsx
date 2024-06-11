import { Outlet, Navigate } from 'react-router-dom';

import useAppSelector from '../../../hooks/app/app-selector';

import { baseRouts, userRouts } from '../../../router/routs';

const ProtectedRoute: React.FC<{ needAuth: boolean }> = ({ needAuth }) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (isAuth && !needAuth) {
    return <Navigate to={baseRouts.HOME} replace />;
  }

  if (!isAuth && needAuth) {
    return <Navigate to={userRouts.SIGNIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
