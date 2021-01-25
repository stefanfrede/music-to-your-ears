import Home from '../layouts/Home.vue';
import About from '../layouts/About.vue';
import NotFound from '../layouts/404.vue';

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/:path(.*)',
    name: '404',
    component: NotFound,
  },
];
