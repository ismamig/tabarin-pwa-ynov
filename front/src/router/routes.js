const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/tuto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'v2', component: () => import('pages/TutoPage.vue') },
      {
        path: 'v3', component: () => import('pages/TutoPageVue3.vue')
      }
    ]
  },
  {
    path: '/lists',
    // component: () => import('layouts/ListLayout.vue'),
    children: [
      { path: ':id', component: () => import('src/pages/ListDetailPage.vue') },
      { path: ':id/task/new', component: () => import('src/pages/NewTaskPage.vue') }
    ]
  },
  {
    path: '/task',
    // component: () => import('layouts/ListLayout.vue'),
    children: [
      { path: ':id', component: () => import('src/pages/TaskDetailPage.vue') },
      { path: 'edit/:id', component: () => import('src/pages/EditTaskPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
