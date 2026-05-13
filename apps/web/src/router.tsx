import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { CollectionPage } from './pages/CollectionPage';
import { WishlistPage } from './pages/WishlistPage';
import { StatsPage } from './pages/StatsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      {
        path: 'collection',
        element: <ProtectedRoute><CollectionPage /></ProtectedRoute>,
      },
      {
        path: 'wishlist',
        element: <ProtectedRoute><WishlistPage /></ProtectedRoute>,
      },
      {
        path: 'stats',
        element: <ProtectedRoute><StatsPage /></ProtectedRoute>,
      },
    ],
  },
]);
