import Vue from "vue";
import VueRouter from "vue-router";
//import HomeView from '../views/HomeView.vue'
import UsersIndex from "../components/UsersIndex.vue";
import LoginPage from "../components/LoginPage.vue";

Vue.use(VueRouter);

function handleCheck(to, from, next) {
  let token = localStorage.getItem("token");
  if (!token) {
    next();
  }else{
    next({ name: "userindex" });
  }
}

function guard(to, from, next) {
  let token = localStorage.getItem("token");
  if (token) {
    next();
  } else {
    next({ name: "LoginPage" });
   
  }
}

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
    beforeEnter: handleCheck,
  },
  {
    path: "/userindex",
    name: "userindex",
    component: UsersIndex,
    beforeEnter: guard,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
