<template>
    <template v-if="isLoading">
	    <div class="loading">
            <div class="loader">загрузка...</div>
        </div>
    </template>
    <template v-else-if="!fatalError.message.length">
        <Suspense>
            <RouterView/>
        </Suspense>
        <BottomButtons/>
    </template>
    <template v-else>
        <ErrorPage/>
    </template>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { Api } from './api';
import eventBus from "./eventBus";
import { defineAsyncComponent, watch } from "vue";
import { useAppStore } from './stores/app';
import { storeToRefs } from 'pinia';
import BottomButtons from './components/UI/BottomButtons.vue';

const api = new Api();

const router = useRouter();
const route = useRoute();
const app = useAppStore();

const { currentUser, token, isLoading, fatalError } = storeToRefs(app);

async function initTelegramApp() {
    try {
        const tg = window.Telegram.WebApp;
        tg.SettingsButton.isVisible = true;

        tg.setHeaderColor("#1f1f1f");
        tg.setBackgroundColor("#1f1f1f");
        tg.setBottomBarColor("#1f1f1f");
        
        tg.ready();

        const initData = tg.initData || '';

        await initApp(initData);
        
    } catch (error: any) {
        console.error(error);
    }
}

async function initApp(initData: string){
    try {
        const data = await api.init({initData: initData});
        if(!data.ok) return;

        if(["/qr", "/register"].includes(window.location.pathname)) window.location.pathname = "/";

        token.value = data.response.token;

        if (!data.response.is_testing && ["/quiz/start", "/quiz/page"].includes(window.location.pathname)) window.location.pathname = "/";

        isLoading.value = false;
    } catch (error: any) {
        isLoading.value = false;
        if(error.data && !error.data.ok){
            switch(error.data.response.exception){
                case "ERR_ACCOUNT_NOT_FOUND":
                case "ERR_ACCOUNT_NOT_REGISTERED":
                    router.replace("/register");
                    break;
                default:
                    fatalError.value.message = error.data.response.description;
                    break;
            }
        }
    }
}

watch(() => route.path, async (newPath) => {
    if(!/^\/quiz/.test(newPath)) return;

    if(!token.value.length) return;

    try {
        const data = await api.getMe();
        if(!data.ok) return;
        
        currentUser.value = data.response.user;
    } catch (error) {
        console.error(error);
    }
})

eventBus.on("reloadInit", () => {
    initApp(window.Telegram.WebApp.initData);
})

window.onload = () => initTelegramApp();

const ErrorPage = defineAsyncComponent(() => import("./pages/error.vue"));
</script>

<style lang="scss">
@use "./assets/scss/app" as *;
</style>
<style lang="scss" scoped>
.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    height: 100dvh;
}
</style>