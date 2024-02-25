import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import authGuard from "src/auth-module/authGuard.js";
import Container from "src/components/Container.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Container,
    children: [
      {
        path: "",
        component: () => import("src/components/annotations/IndexPage.vue"),
        name: "home"
      },
      {
        path: "notes",
        component: () => import("src/components/notes/IndexPage.vue"),
        name: "notes"
      },
      {
        path: "contacts/:id",
        component: () => import("src/components/contacts/ShowPage.vue"),
        props: true
      },
      {
        path: "contacts/",
        component: () => import("src/components/contacts/IndexPage.vue"),
        props: true
      },
      {
        path: "protect",
        component: () => import("src/components/Encrypt.vue")
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    component: () => import("src/components/Login.vue"),
    name: "login"
  },
  {
    path: "/restore",
    component: () => import("src/components/Restore.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "*",
    component: () => import("../components/404Page.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach(authGuard);

export default router;
