import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: () => import("./pages/index.vue"),
        },
        {
            path: "/welcome",
            component: () => import("./pages/welcome.vue"),
        },
        {
            path: "/quiz/start",
            component: () => import("./pages/quiz/start.vue"),
        },
    ],
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
