import { createRouter, createWebHistory } from 'vue-router'

// Create your Client-Side Routing here
const routes = [
  {
    path: '/',
    redirect: {
      name: 'Home',
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/Profile.vue'),
  },
  {
    path: '/session',
    name: 'Session',
    component: () => import('../components/Session.vue'),
  },
  {
    path: '/announcement',
    name: 'Announcement',
    component: () => import('../components/Announcement.vue'),
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// User Auth Middleware
router.beforeEach((to, from, next) => {
  const requiresUserAuth = to.matched.some(record => record.meta.requiresUserAuth);
  const user = to.matched.some(record => record.meta.user);
  const isUserLoggedIn = localStorage.getItem('userToken');
  if (requiresUserAuth && !isUserLoggedIn) {
      next({ name: 'Login' });
  } else if (user && isUserLoggedIn) {
      next({ name: 'Home' });
  } else {
      next();
  }
});
export default router
