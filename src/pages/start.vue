<template>
    <div class="page">
        <div class="buttons-container">
            <Button @click="startRandom">Случайный</Button>
        </div>
        <div class="logo">SchoolScout</div>
    </div>
</template>
<script lang="ts" setup>
import { Api } from '../api';
import Button from '../components/UI/Button.vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/app';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';

const api = new Api();
const router = useRouter();
const app = useAppStore();

const { bottomButtons } = storeToRefs(app);

async function startRandom(){
    try {
        const data = await api.randomQuiz({count: 20});
        if(!data.ok) return;

        router.replace("/quiz/start");
    } catch (err) {
        console.error(err);
    }
}

onMounted(() => {
    app.addBottomButton({
        text: "Назад",
        path: "/"
    })
})

onUnmounted(() => {
    bottomButtons.value = [];
})
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
@use "../assets/scss/menu" as *;
</style>