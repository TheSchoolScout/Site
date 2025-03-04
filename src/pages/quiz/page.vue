<template>
    <div class="page">
        <template v-if="page && page.question">
            <header class="question-info">
                <div class="counters">
                    <div class="timer">0:29</div>
                    <div class="step">{{ (page.quiz.currentPage + 1) }}/{{ page.quiz.totalQuestions }}</div>
                </div>
                <div class="question">{{ page.question.metadata.questionText }}</div>
            </header>
            <fieldset class="memorization-tip" v-if="page.question.metadata.memorizationTip">
                <legend>Как запомнить?</legend>
                <div>{{ page.question.metadata.memorizationTip }}</div>
            </fieldset>
            <SelectBox :question="page.question" :correct="page.question.metadata.correctOptionIndex" :disabled="page.question.metadata.correctOptionIndex != null" v-model="selected"/>
            
            <Button @click="next">Далее</Button>
            <Button @click="stop">Завершить досрочно</Button>
        </template>
        <template v-else>
            <ul>
                <li>Общее количество заданий: {{ page?.quiz.totalQuestions }}</li>
                <li>Время прохождения теста: {время в секундах} секунд ({время в минутах} минут)</li>
                <li>Ответы на задания необходимо давать в последовательном порядке</li>
                <li>Ответ к каждому заданию отобразится после его подтверждения</li>
                <li>По завершении теста ваш результат будет сохранён и станет доступен для просмотра другими участниками</li>
            </ul>
            <p class="confirmation">Я подтверждаю, что ознакомился(-лась) с правилами тестирования и даю согласие на его прохождение.</p>

            <Button @click="next">Начать</Button>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { Api } from '../../api';
import { useAppStore } from '../../stores/app';
import { storeToRefs } from 'pinia';
import Button from '../../components/UI/Button.vue';
import SelectBox from '../../components/Quiz/SelectBox.vue';

const api = new Api();
const app = useAppStore();

const { token, quizResults } = storeToRefs(app);

const router = useRouter();

const page = ref<{
    quiz: Quiz;
    question: Question | null;
}>();
const selected = ref<number | null>(null);

watch(selected, async (choice) => {
    if(!page.value || !selected.value || choice == null) return;
    try {
        const data = await api.answerQuiz({
            page: page.value.quiz.currentPage,
            answer: choice
        })

        if(!data.ok) return;
    } catch (err) {
        console.error(err);
    }
})

async function load(){
    try {
        const data = await api.getQuizPage();

        if(!data.ok) return;

        page.value = data.response;

        if(!data.response.question) return;
        
        selected.value = data.response.question.metadata.selectedOption;
    } catch (err) {
        console.error(err);
    }
}

async function next(){
    if((page.value!.quiz.currentPage + 1) == page.value!.quiz.totalQuestions){
        await stop();
        return;
    }
    const data = await api.getQuizNextPage();

    if(!data.ok) return;

    page.value = data.response;
    if(data.response.question) selected.value = data.response.question.metadata.selectedOption;
}

async function stop(){
    if(!page.value) return;
    try {
        const data = await api.stopQuiz()

        if(!data.ok) return;

        quizResults.value = {
            correctAnswers: data.response.correctAnswers,
            totalQuestions: data.response.totalQuestions
        }

        router.replace("/quiz/finish");
    } catch (err) {
        console.error(err);
    }
}

onMounted(async () => {
    if(page.value) return;

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
.page {
    display: flex;
    flex-direction: column;
}

ul {
    padding-left: 2rem;
    li {
        list-style: decimal;
    }
}

.confirmation {
    font-size: 0.9rem;
}

.question-info {
    .question {
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--color-title);
        margin-bottom: 8px;
    }

    .counters {
        display: flex;
        align-items: center;

        .timer, .step {
            color: var(--color-hint);
        }

        .timer {
            flex: 1;
        }
    }
}

.memorization-tip {
    border-radius: 8px;
    border: 1.5px solid var(--color-hint);
    margin-bottom: 8px;

    legend {
        color: var(--color-hint);
    }
}
</style>