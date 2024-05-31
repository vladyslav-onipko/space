import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layout/Root';
import HomePage from '../pages/Home';
import Error from '../pages/Error/Error';
import Login from '../pages/User/Login';
import Registration from '../pages/User/Registration';
import Profile from '../pages/User/Profile';
import ProtectedRoute from '../components/UI/Helpers/ProtectedRoute';
import ProfileEditModal from '../components/User/ProfileEditModal';
import RocketCreateModal from '../components/Rocket/RocketCreateModal';
import RocketEditModal from '../components/Rocket/RocketEditModal';

import { UrlParamsContextProvider } from '../store/http/url-params-context';

import { baseRouts, userRouts } from './routs';

const router = createBrowserRouter([
  {
    path: baseRouts.HOME,
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <ProtectedRoute needAuth={false} />,
        children: [
          { path: userRouts.SIGNIN, element: <Login /> },
          { path: userRouts.SIGNUP, element: <Registration /> },
        ],
      },
      {
        element: <ProtectedRoute needAuth />,
        children: [
          {
            path: `${userRouts.PROFILE}/:id`,
            element: (
              <UrlParamsContextProvider>
                <Profile />
              </UrlParamsContextProvider>
            ),
            children: [
              { path: userRouts.EDIT_PROFILE, element: <ProfileEditModal /> },
              { path: userRouts.ADD_ROCKET, element: <RocketCreateModal /> },
              { path: `${userRouts.EDIT_ROCKET}`, element: <RocketEditModal /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
