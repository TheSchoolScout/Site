import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./pages/index.vue"),
        },
        {
            path: "/register",
            component: () => import("./pages/register.vue"),
        },
        {
            path: "/welcome",
            component: () => import("./pages/welcome.vue"),
        },
        {
            path: "/quiz/page",
            component: () => import("./pages/quiz/page.vue"),
        },
        {
            path: "/quiz/finish",
            component: () => import("./pages/quiz/finish.vue"),
        },
        {
            path: "/quiz/result/:id",
            component: () => import("./pages/quiz/result.vue"),
        },
        {
            path: "/qr",
            component: () => import("./pages/qr.vue"),
        },
        {
            path: "/themes",
            component: () => import("./pages/themes.vue"),
        },
        {
            path: "/rating",
            component: () => import("./pages/rating.vue"),
        },
        {
            path: "/admin",
            component: () => import("./pages/admin/index.vue"),
        },
        {
            path: "/admin/upload",
            component: () => import("./pages/admin/upload.vue"),
        },
        {
            path: "/admin/confirm",
            component: () => import("./pages/admin/confirm.vue"),
        },
    ],
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");