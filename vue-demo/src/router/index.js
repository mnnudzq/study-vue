import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      auth: true // 保护页面
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 说明需要登陆
    const token = localStorage.getItem("token");

    if (token) {
      next();
    } else {
      next({
        path: "/login",
        query: {redirect: to.path}
      });
    }
  } else { // 不需要登录验证
    next();
  }
});

export default router
