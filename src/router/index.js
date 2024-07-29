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
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/Profile.vue'),
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
