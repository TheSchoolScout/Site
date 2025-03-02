<template>
	<RouterView/>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { Api } from './api';
import eventBus from "./eventBus";
import { watch } from "vue";
import { useAppStore } from './stores/app';
import { storeToRefs } from 'pinia';

const api = new Api();

const router = useRouter();
const route = useRoute();
const app = useAppStore();

const { currentUser, token } = storeToRefs(app);

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

        if(!data.response.is_testing && ["/quiz/start", "/quiz/page"].includes(window.location.pathname)) window.location.pathname = "/";
    } catch (error: any) {
        if(error.data && !error.data.ok){
            switch(error.data.response.exception){
                case "ERR_ACCOUNT_NOT_FOUND":
                    router.replace("/register");
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
</script>

<style lang="scss">
@use "./assets/scss/app" as *;
</style>
