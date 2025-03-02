<template>
    <div class="page">
        <div class="buttons-container">
            <Button @click="startRandom">Случайный</Button>
            <RouterLink class="btn" to="/"><Button>Назад</Button></RouterLink>
        </div>
        <div class="logo">SchoolScout</div>
    </div>
</template>
<script lang="ts" setup>
import { Api } from '../api';
import Button from '../components/UI/Button.vue';
import { useRouter } from 'vue-router';

const api = new Api();
const router = useRouter();

async function startRandom(){
    try {
        const data = await api.randomQuiz({count: 20});
        if(!data.ok) return;

        router.replace("/quiz/start");
    } catch (err) {
        console.error(err);
    }
}
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
@use "../assets/scss/menu" as *;
</style>