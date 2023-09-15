import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTE_PATH } from '@constants/routes';
import { Spin } from 'antd';

const Overview = lazy(() => import('./pages/overview'));

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: ROUTE_PATH.home,
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Spin size="large" />
              </div>
            }
          >
            <Overview />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <div>error</div>,
  },
]);

function Component() {
  return <RouterProvider router={router} />;
}

export default Component;
