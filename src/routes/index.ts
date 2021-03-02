import LoginComponent from '../containers/Login';
import DashboardComponent from '../containers/Dashboard';

const routes = [
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
