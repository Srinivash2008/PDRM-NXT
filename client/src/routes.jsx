import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Navigate, Route, Outlet } from 'react-router-dom';

// project import
import Loader from './components/Loader/Loader';

import { BASE_URL } from './config/constant';
import AuthGuard from './Components/Guards/authGaurd';
import Role_Gaurd from './Components/Guards/Role_Gaurd';
import { AdminLayout, Home, Signin } from 'lazyImports';
import { Employee_Applaud_Card_Routes } from 'Routes/Employee_Applaud_Card_Routes/routes';

// ==============================|| ROUTES ||============================== //

const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

export const routes = [
  {
    exact: 'true',
    path: '/auth/signin',
    guard: AuthGuard,
    element: Signin
  },
  {
    path: 'Employee_Applaud_Card/*',
    guard: Role_Gaurd,
    element: <Outlet />,
    layout: AdminLayout,
    routes: Employee_Applaud_Card_Routes
  },

  {
    path: '*',
    guard: Role_Gaurd,
    routes: [
      {
        exact: 'true',
        path: '/',
        guard: Role_Gaurd,
        layout: AdminLayout,
        element: Home
      },
    ]
  },
];

export default renderRoutes;
