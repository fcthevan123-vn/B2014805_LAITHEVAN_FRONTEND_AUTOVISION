import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import LoginPage from "../views/LoginPage.vue";
import DetailProductVue from "../views/DetailProduct.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import AdminHomePage from "../views/AdminHomePage.vue";
import RegisterPage from "../views/RegisterPage.vue";
const routes = [
  {
    path: "/",
    name: "defaultLayout",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomePage,
      },
      {
        path: "/about",
        name: "about",
        component: AboutPage,
      },
      {
        path: "/login",
        name: "login",
        component: LoginPage,
      },
      {
        path: "/register",
        name: "register",
        component: RegisterPage,
      },
      {
        path: "/product",
        name: "product",
        component: DetailProductVue,
      },
    ],
  },
  {
    path: "/admin",
    name: "adminLayout",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "adminHompage",
        component: AdminHomePage,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
