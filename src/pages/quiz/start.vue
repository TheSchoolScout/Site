<template>
    <div class="page">
        <ul>
            <li>Общее количество заданий: {количество заданий}</li>
            <li>Время прохождения теста: {время в секундах} секунд ({время в минутах} минут)</li>
            <li>Ответы на задания необходимо давать в последовательном порядке</li>
            <li>Ответ к каждому заданию отобразится после его подтверждения</li>
            <li>По завершении теста ваш результат будет сохранён и станет доступен для просмотра другими участниками</li>
        </ul>
        <p class="confirmation">Я подтверждаю, что ознакомился(-лась) с правилами тестирования и даю согласие на его прохождение.</p>
        <Button @click="startQuiz">Начать</Button>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Api } from '../../api';
import { useAppStore } from '../../stores/app';
import { storeToRefs } from 'pinia';
import Button from '../../components/UI/Button.vue';

const api = new Api();
const app = useAppStore();

const { token } = storeToRefs(app);

const quiz = ref<Quiz>();
const router = useRouter();

async function load(){
    try {
        const data = await api.getQuizPage();

        if(!data.ok) return;

        quiz.value = data.response.quiz;
    } catch (err) {
        console.error(err);
    }
}

async function startQuiz(){
    try {
        const data = await api.getQuizNextPage();

        if(!data.ok) return;

        router.replace("/quiz/page");
    } catch (err) {
        console.error(err);
    }
}

onMounted(async () => {
    if(quiz.value) return;

    load();

    watch(token, () => {
        if(token.value) load();
    });
})
</script>
<style lang="scss">
@use "../../assets/scss/page" as *;
</style>
<style lang="scss" scoped>
ul {
    padding-left: 2rem;
    li {
        list-style: decimal-leading-zero;
    }
}

.confirmation {
    font-size: 0.9rem;
}
</style>