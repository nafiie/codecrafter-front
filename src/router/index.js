import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Home.vue'
import UsersPage from '../views/UsersPage.vue'
import EditUser from '../views/EditUser.vue'
import Loginpage from '../views/Login.vue'
import Register from '../views/Register.vue'



const routes = [
  { path: '/',component: Homepage },
  { path: '/login',component: Loginpage },
  { path: '/register',component: Register},

  { path: '/users', component: UsersPage, meta:{requiresAuth: true} },
  { path: '/users/edit/:id', component: EditUser, props: true, meta:{requiresAuth: true}  },

]


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
   }
   else{
    next();
   }
})

export default router