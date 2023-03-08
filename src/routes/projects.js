import { Projects, Project, Task } from 'src/pages/projects';

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
  },
  {
    path: '/project/:projectId/task/:taskId',
    component: <Task />,
    protected: true,
  }
]

export default projectsRoutes;