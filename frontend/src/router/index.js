import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { store } from "@/store";
import { AuthGetters } from "@/store/auth";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/product",
        name: "Product",
        meta: { auth: true },
        component: () => import("../views/product/Index.vue"),
    },
    {
        path: "/product/form",
        name: "ProductForm",
        meta: { auth: true },
        component: () => import("../views/product/Form.vue"),
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: () => import("../views/Checkout.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    if (!to.meta.auth) {
        next();
        return;
    }
    if (to.meta.auth) {
        if (store.getters[AuthGetters.GET_IS_AUTHENTICATED]) {
            next();
        }
        else {
            next({ name: "Login" });
        }
    }
});
export default router;
//# sourceMappingURL=index.js.map