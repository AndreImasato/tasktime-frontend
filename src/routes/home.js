import { Home } from 'src/pages/home';

const homeRoutes = [
  {
    path: '/dashboards',
    component: <Home/>,
    name: 'Dashboards',
    protected: true
  }
];

export default homeRoutes;