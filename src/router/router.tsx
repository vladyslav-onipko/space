import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layout/Root';
import HomePage from '../pages/Home';
import Error from '../pages/Error/Error';
import Login from '../pages/User/Login';
import Registration from '../pages/User/Registration';
import Profile from '../pages/User/Profile';
import ProtectedRoute from '../components/UI/Helpers/ProtectedRoute';
import ProfileEditModal from '../components/User/ProfileEditModal';
import PlaceCreateModal from '../components/Place/PlaceCreateModal';
import PlaceEditModal from '../components/Place/PlaceEditModal';
import PlaceDetail from '../pages/Place/PlaceDetail';

import { UrlParamsContextProvider } from '../store/http/url-params-context';

import { baseRouts, userRouts, placeRouts } from './routs';

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
            path: `${userRouts.PROFILE}`,
            element: (
              <UrlParamsContextProvider>
                <Profile />
              </UrlParamsContextProvider>
            ),
            children: [
              { path: userRouts.EDIT_PROFILE, element: <ProfileEditModal /> },
              { path: userRouts.ADD_PLACE, element: <PlaceCreateModal /> },
            ],
          },
          {
            path: placeRouts.DETAIL_PLACE,
            element: <PlaceDetail />,
            children: [{ path: placeRouts.EDIT_PLACE, element: <PlaceEditModal /> }],
          },
        ],
      },
    ],
  },
]);

export default router;
