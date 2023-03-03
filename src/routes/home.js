import { Home } from 'src/pages/home';

const homeRoutes = [
  {
    path: '/dashboards',
    component: <Home/>,
    protected: true
  }
];

export default homeRoutes;