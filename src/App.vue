<template>
	<RouterView/>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Api } from './api';

const router = useRouter();

async function initTelegramApp() {
    try {
        const tg = window.Telegram.WebApp;
        // tg.SettingsButton.isVisible = true;

        // tg.setHeaderColor("#212121");
        // tg.setBackgroundColor("#212121");
        // tg.setBottomBarColor("#212121");

        // tg.requestFullscreen();
        
        // tg.onEvent("settingsButtonClicked", () => {
        //     router.push('/settings');
        // });
        tg.ready();

        const initData = tg.initData || '';

        console.log(await new Api().init({initData: initData}))
    } catch (error: any) {
        console.error(error);
    }
}

window.onload = () => initTelegramApp();
</script>

<style lang="scss">
@use "./assets/scss/app" as *;
</style>
