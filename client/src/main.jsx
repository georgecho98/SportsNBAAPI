import { StrictMode } from 'react'

import './index.css'

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchSport from './pages/SearchSport.jsx';
import SavedScoreResult from './pages/SavedScoreResult.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx';

import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <SearchSport />
      }, {
        path: '/result',
        element: <SavedScoreResult/>
      }
    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

