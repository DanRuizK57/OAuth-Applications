import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import UserPage from "../views/UserPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
  },
  {
    path: "/user/",
    name: "user-info",
    component: UserPage,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const googleUser = localStorage.getItem("googleUser");

  if (requiresAuth && !googleUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
