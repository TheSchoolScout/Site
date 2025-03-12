<template>
    <div class="page">
        <template v-if="page && page.question">
            <header class="question-info">
                <div class="indicators">
                    <button class="stop" @click="stop"><Icon icon="material-symbols:close"/></button>
                    <div class="progress">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="timer">{{ timeLeft() }}</div>
                </div>
                <div class="question">{{ page.question.metadata.questionText }}</div>
            </header>
            <fieldset class="memorization-tip" v-if="page.question.metadata.memorizationTip">
                <legend>Как запомнить?</legend>
                <div>{{ page.question.metadata.memorizationTip }}</div>
            </fieldset>
            <SelectBox :question="page.question" :quiz="page.quiz"/>
        </template>
        <template v-else-if="page?.quiz.currentPage == -1">
            <ul>
                <li>Общее количество заданий: {{ page?.quiz.totalQuestions }}</li>
                <li>Время прохождения теста: {время в секундах} секунд ({время в минутах} минут)</li>
                <li>Ответы на задания необходимо давать в последовательном порядке</li>
                <li>Ответ к каждому заданию отобразится после его подтверждения</li>
                <li>По завершении теста ваш результат будет сохранён и станет доступен для просмотра другими участниками</li>
            </ul>
            <p class="confirmation">Я подтверждаю, что ознакомился(-лась) с правилами тестирования и даю согласие на его прохождение.</p>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Api } from '../../api';
import { useAppStore } from '../../stores/app';
import { storeToRefs } from 'pinia';
import { Icon } from "@iconify/vue";
import SelectBox from '../../components/Quiz/SelectBox.vue';

const api = new Api();
const app = useAppStore();

const { token, quizResults, bottomButtons } = storeToRefs(app);

const router = useRouter();

const page = ref<{
    quiz: Quiz;
    question: Question | null;
}>();

async function load(){
    try {
        const data = await api.getQuizPage();

        if(!data.ok) return;

        page.value = data.response;

        console.log(page.value)

        if (new Date(data.response.quiz.endTime).getTime() <= Date.now()) {
            return stop();
        };

        if(!data.response.question) return;
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

const timer = ref<NodeJS.Timeout>();
const now = ref(new Date());

onMounted(async () => {
    if(page.value) return;

    await load();

    watch(token, () => {
        if(token.value) load();
    });

    app.addBottomButton({
        text: page.value!.quiz.currentPage == -1 ? "Начать" : "Проверить",
        disabled: page.value!.question?.metadata.selectedOption != null,
        action: () => next()
    })

    timer.value = setInterval(() => {
        now.value = new Date();
    }, 1000);
})

onUnmounted(() => {
    if (timer.value) clearInterval(timer.value);
    bottomButtons.value = [];
})

function timeLeft() {
    if (!page.value || page.value.quiz.endTime) return "0:00";
    const quizEnd = new Date(page.value!.quiz.endTime!);

    const ms = quizEnd.getTime() - now.value.getTime();

    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}
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

    .indicators {
        display: flex;
        align-items: center;

        .progress {
            flex: 1;
            .progress-bar {
                height: 35px;
                background-color: var(--color-accent);
            }
        }

        .timer, .step {
            color: var(--color-hint);
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