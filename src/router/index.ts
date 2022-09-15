import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'main',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/loginView.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/main/indexView.vue'),
      meta: {
        requiresAuth: false,
      },
      redirect: '/main',
      children: [
        {
          path: '/main',
          name: 'main',
          component: () => import('@/views/main/mainView.vue'),
        },
        {
          path: '/class',
          name: 'class',
          component: () => import('@/views/main/classView.vue'),
        },
        {
          path: '/detail',
          name: 'detail',
          component: () => import('@/views/report/detailView.vue'),
        },
        {
          path: '/create',
          name: 'create',
          component: () => import('@/views/report/createView.vue'),
        },
        {
          path: '/searchResult',
          name: 'searchResult',
          component: () => import('@/views/report/searchResultView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
