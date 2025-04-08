<template>
    <template v-if="isLoading">
	    <div class="loading">
            <ProgressBar/>
        </div>
    </template>
    <template v-else-if="!fatalError.message.length">
        <RouterView v-slot="{Component, route}">
            <Suspense>
                <div>
                    <component :is="Component" :key="route.path"/>
                </div>
                <template #fallback>
                    <div class="loading">
                        <ProgressBar/>
                    </div>
                </template>
            </Suspense>
        </RouterView>
        <BottomBar v-if="!['/quiz/page', '/quiz/finish'].includes(route.path)"/>
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
import ProgressBar from './components/UI/ProgressBar.vue';
import BottomBar from './components/BottomBar.vue';

const api = new Api();

const router = useRouter();
const route = useRoute();
const app = useAppStore();

const { me, token, isLoading, fatalError } = storeToRefs(app);

async function initTelegramApp() {
    try {
        const tg = window.Telegram.WebApp;
        tg.SettingsButton.isVisible = true;

        tg.disableVerticalSwipes();

        tg.setHeaderColor("#1f1f1f");
        tg.setBackgroundColor("#1f1f1f");
        tg.setBottomBarColor("#1f1f1f");
        
        tg.ready();

        const initData = tg.initData || '';

        await initApp(initData);
        
    } catch (error: any) {
        console.error(error);
        fatalError.value.message = error.data.response.description || error.data.message;
    }
}

async function initApp(initData: string){
    try {
        const data = await api.init({initData: initData});
        if(!data.ok) return;

        me.value = {
            user: data.response.user,
            is_daily_available: data.response.is_daily_available,
            is_testing: data.response.is_testing
        };

        router.replace("/");

        token.value = data.response.token;

        if(data.response.user.rank == "none"){
            router.replace("/register");
            isLoading.value = false;
            return;
        }

        if(data.response.is_testing) router.replace("/quiz/page");

        isLoading.value = false;
    } catch (error: any) {
        isLoading.value = false;
        if(error.data && !error.data.ok){
            switch(error.data.response.exception){
                case "ERR_ACCOUNT_NOT_FOUND":
                case "ERR_ACCOUNT_NOT_REGISTERED":
                    if(route.path == "/qr") break;
                    router.replace("/register");
                    break;
                default:
                    fatalError.value.message = error.data.response.description;
                    break;
            }
        } else {
            fatalError.value.message = (error.data && error.data.response.description) || error.message;
        }
    }
}

watch(() => route.path, async (newPath) => {
    if(newPath == "/quiz/page") return;

    if(token.value.length == 0) return;

    if(me.value?.user.rank == "none") return;

    try {
        const data = await api.getMe();
        if(!data.ok) return;
        
        me.value = data.response;
    } catch (error) {
        console.error(error);
    }
})

eventBus.on("reloadInit", () => {
    initApp(window.Telegram.WebApp.initData);
})

window.onload = async () => await initTelegramApp();

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