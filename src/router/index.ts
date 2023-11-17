import { createWebHistory, createRouter } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import UserLayout from "../layouts/UserLayout.vue";
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
import {
  AdminLoginPage,
  AdminManagerProduct,
  AdminManagerOrder,
  AdminManagerUser,
} from "../views/Adminpages";
import { useStaffStore } from "../stores/staffStore";
import { UserAllOrder, UserProfile } from "../views/Userpages";
import { useUserStore } from "../stores/userStore";

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
        path: "/cart/:id",
        name: "cart",
        component: CartPage,
      },
    ],
  },
  // admin layout
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
      {
        path: "/admin/manage-orders",
        name: "adminManageOrders",
        component: AdminManagerOrder,
        meta: { requireAdmin: true },
      },
      {
        path: "/admin/manage-users",
        name: "adminManageUsers",
        component: AdminManagerUser,
        meta: { requireAdmin: true },
      },
    ],
  },
  {
    path: "/admin/login",
    name: "adminLogin",
    component: AdminLoginPage,
  },

  // User layout
  {
    path: "/user",
    name: "userLayout",
    component: UserLayout,
    children: [
      {
        path: "",
        name: "userProfile",
        component: UserProfile,
        meta: { requiresAuth: true },
      },
      {
        path: "/user/all-orders",
        name: "userAllOrder",
        component: UserAllOrder,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
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

// Kiểm tra xem người dùng có đang đăng nhập hay không
router.afterEach((to, from) => {
  const userStore = useUserStore();
  const userLogin = userStore.getStateLogin();
  if (to.meta.requiresAuth && !userLogin) {
    return { name: "login" };
  }
});

// Kiểm tra xem nhân viên có đang đăng nhập hay không
router.afterEach((to, from) => {
  const staffStore = useStaffStore();
  const staffLogin = staffStore.getStateLogin();

  if (to.meta.requireAdmin && !staffLogin) {
    return { name: "error" };
  }
});

export default router;
