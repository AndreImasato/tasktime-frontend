import { Projects } from 'src/pages/projects';

const projectsRoutes = [
  {
    path: '/projects',
    component: <Projects />,
    protected: true,
  },
]

export default projectsRoutes;