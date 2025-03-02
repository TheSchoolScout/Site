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
            path: "/quiz/start",
            component: () => import("./pages/quiz/start.vue"),
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
            path: "/start",
            component: () => import("./pages/start.vue"),
        },
        {
            path: "/qr",
            component: () => import("./pages/qr.vue"),
        },
        {
            path: "/history",
            component: () => import("./pages/history.vue"),
        },
        {
            path: "/themes",
            component: () => import("./pages/themes.vue"),
        },
    ],
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
