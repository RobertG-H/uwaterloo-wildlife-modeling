import LoginComponent from '../containers/Login';
import DashboardComponent from '../containers/Dashboard';
import { Component } from 'react';

interface routeTypes {
  path: string;
  component: (props: any) => JSX.Element;
  title: string;
}

const routes: routeTypes[] = [
  {
    path: '/auth/login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '/',
    component: DashboardComponent,
    title: 'Dashboard',
  },
];

export default routes;
