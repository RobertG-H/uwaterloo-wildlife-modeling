import LoginComponent from '../containers/Login';
import DashboardComponent from '../containers/Dashboard';
import { Component } from 'react';

export interface routeTypes {
  path: string;
  component: (props: any) => JSX.Element;
  title: string;
  needsAuth: boolean;
}

const routes: routeTypes[] = [
  {
    path: '/auth/login',
    component: LoginComponent,
    title: 'Login',
    needsAuth: false,
  },
  {
    path: '/',
    component: DashboardComponent,
    title: 'Dashboard',
    needsAuth: true,
  },
];

export default routes;
