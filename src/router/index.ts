import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";

import {
  AboutPage,
  AdminHomePage,
  AllProductsPage,
  CartPage,
  DetailProduct,
  ErrorPage,
  HomePage,
  LoginPage,
  RegisterPage,
} from "../views";
import { AdminLoginPage, AdminManagerProduct } from "../views/Adminpages";
import { useStaffStore } from "../stores/staffStore";
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
        path: "/product/:id",
        name: "product",
        component: DetailProduct,
      },
      {
        path: "/all-products",
        name: "allProducts",
        component: AllProductsPage,
      },
      {
        path: "/cart",
        name: "cart",
        component: CartPage,
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
        meta: { requireAdmin: true },
      },
      {
        path: "/admin/manage-products",
        name: "adminManageProducts",
        component: AdminManagerProduct,
        meta: { requireAdmin: true },
      },
    ],
  },
  {
    path: "/admin/login",
    name: "adminLogin",
    component: AdminLoginPage,
  },
  {
    path: "/error",
    name: "error",
    component: ErrorPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    return { name: "login" };
  }
});

router.afterEach((to, from) => {
  const staffStore = useStaffStore();
  const staffLogin = staffStore.getStateLogin();

  if (to.meta.requireAdmin && !staffLogin) {
    return { name: "error" };
  }
});

export default router;
