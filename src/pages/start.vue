<template>
    <div class="page">
        <div class="buttons-container">
            <Button @click="startRandom">Случайный</Button>
            <Button @click="startDaily" :disabled="!me?.is_daily_available">Тест дня</Button>
        </div>
        <div class="logo">SchoolScout</div>
        <BottomButton path="/">Назад</BottomButton>
    </div>
</template>
<script lang="ts" setup>
import { Api } from '../api';
import Button from '../components/UI/Button.vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/app';
import { storeToRefs } from 'pinia';
import BottomButton from '../components/UI/BottomButton.vue';

const api = new Api();
const router = useRouter();
const app = useAppStore();

const { me } = storeToRefs(app);

async function startRandom(){
    try {
        const data = await api.randomQuiz({count: 20});
        if(!data.ok) return;

        router.replace("/quiz/page");
    } catch (err) {
        console.error(err);
    }
}

async function startDaily(){
    try {
        const data = await api.dailyQuiz();
        if(!data.ok) return;

        router.replace("/quiz/page");
    } catch (err) {
        console.error(err);
    }
}
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
@use "../assets/scss/menu" as *;
</style>