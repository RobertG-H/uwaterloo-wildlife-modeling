import { LoginContainer } from './containers/Login';
import { DashboardContainer } from './containers/Dashboard';

export interface routeTypes {
  path: string;
  component: (props: any) => JSX.Element;
  title: string;
  needsAuth: boolean;
}

const routes: routeTypes[] = [
  {
    path: '/auth/login',
    component: LoginContainer,
    title: 'Login',
    needsAuth: false,
  },
  {
    path: '/',
    component: DashboardContainer,
    title: 'Dashboard',
    needsAuth: true,
  },
];

export default routes;
