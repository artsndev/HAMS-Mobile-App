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
    component: () => import('../components/auth/Login.vue'),
    meta: {
      user: true,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/auth/Register.vue'),
    meta: {
      user: true,
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    meta: {
      requiresUserAuth: true,
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../components/Profile.vue'),
    meta: {
      requiresUserAuth: true,
    }
  },
  {
    path: '/session',
    name: 'Session',
    component: () => import('../components/Session.vue'),
    meta: {
      requiresUserAuth: true,
    }
  },
  {
    path: '/announcement',
    name: 'Announcement',
    component: () => import('../components/Announcement.vue'),
    meta: {
      requiresUserAuth: true,
    }
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component: () => import('../components/Doctor.vue'),
    meta: {
      requiresUserAuth: true,
    }
  },
  {
    path: '/doctor/profile/:id',
    name: 'Doctor Profile',
    component: () => import('../components/DoctorProfile.vue'),
    meta: {
      requiresUserAuth: true,
    }
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
