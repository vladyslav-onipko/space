import { createBrowserRouter } from 'react-router-dom';

import Routs from '../models/Routs';
import RootLayout from '../layout/Root';
import HomePage from '../pages/Home';
import Favorites from '../pages/Favorites';
import Error from '../pages/Error';

const router = createBrowserRouter([
    { 
        path: Routs.HOME, 
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <HomePage /> },
            { path: Routs.FAVORITES, element: <Favorites /> }
        ]
    }
]);

export default router;