import { Projects, Project } from 'src/pages/projects';

const projectsRoutes = [
  {
    path: '/projects',
    component: <Projects />,
    protected: true,
  },
  {
    path: '/project/:projectId',
    component: <Project />,
    protected: true,
  }
]

export default projectsRoutes;