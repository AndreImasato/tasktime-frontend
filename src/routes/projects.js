import { Projects, Project, Task } from 'src/pages/projects';

const projectsRoutes = [
  {
    path: '/projects',
    component: <Projects />,
    breadcrumb: 'Projetos',
    protected: true,
  },
  {
    path: '/projects/:projectId',
    breadcrumb: 'Detalhes Projeto',
    component: <Project />,
    protected: true,
  },
  {
    path: '/projects/:projectId/:taskId',
    breadcrumb: 'Detalhes Tarefa',
    component: <Task />,
    protected: true,
  }
]

export default projectsRoutes;