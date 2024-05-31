import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowDown,
  faAngleLeft,
  faAngleRight,
  faCircleExclamation,
  faCircleCheck,
  faXmark,
  faBars,
  faRocket,
  faUserAstronaut,
  faSearch,
  faSpaceShuttle,
  faRotate,
  faEllipsisVertical,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faTrashCan,
  faEnvelope,
  faEye,
  faCircleUser,
  faEyeSlash,
  faShareSquare,
  faFaceSadTear,
  faPenToSquare,
} from '@fortawesome/free-regular-svg-icons';

import { store } from './store';

import App from './App';

library.add(
  faArrowDown,
  faAngleLeft,
  faAngleRight,
  faTrashCan,
  faHeart,
  faEnvelope,
  faEye,
  faCircleExclamation,
  faCircleCheck,
  faCircleUser,
  faEyeSlash,
  faXmark,
  faBars,
  faUserAstronaut,
  faRocket,
  faSearch,
  faShareSquare,
  faSpaceShuttle,
  faRotate,
  faFaceSadTear,
  faEllipsisVertical,
  faPenToSquare,
  faTrash
);

const apolloClient = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>
);
