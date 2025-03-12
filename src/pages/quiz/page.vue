<template>
    <div class="page">
        <template v-if="page && page.question">
            <header class="question-info">
                <div class="indicators">
                    <button class="stop" @click="stopQuizPopupOpened = true"><Icon icon="material-symbols:close" height="2rem" width="2rem"/></button>
                    <div class="progress">
                        <div class="progress-bar" :style="{transform: progressBarTransform()}"></div>
                    </div>
                    <div class="timer" v-text="timeLeft()"></div>
                </div>
                <div class="question">{{ page.question.metadata.questionText }}</div>
            </header>
            <fieldset class="memorization-tip" v-if="page.question.metadata.memorizationTip">
                <legend>Как запомнить?</legend>
                <div>{{ page.question.metadata.memorizationTip }}</div>
            </fieldset>
            <SelectBox :question="page.question" :quiz="page.quiz"/>
            <BottomButton @click="next" :disabled="!isGoingNextAvailable">{{ currentStage == "check" || isTimeOver ? 'Далее' : 'Проверить' }}</BottomButton>
        </template>
        <template v-else-if="page?.quiz.currentPage == -1">
            <ul>
                <li>Общее количество заданий: {{ page.quiz.totalQuestions }}</li>
                <li>Время прохождения теста: {{ testTime(page.quiz.timeLimit) }}</li>
                <li>Ответы на задания необходимо давать в последовательном порядке</li>
                <li>Ответ к каждому заданию отобразится после его подтверждения</li>
                <li>По завершении теста ваш результат будет сохранён и станет доступен для просмотра другими участниками</li>
            </ul>
            <p class="confirmation">Я подтверждаю, что ознакомился(-лась) с правилами тестирования и даю согласие на его прохождение.</p>
            <BottomButton @click="next">Начать</BottomButton>
        </template>
        <Teleport to="#teleports">
            <PopupWindow v-if="stopQuizPopupOpened" @close="stopQuizPopupOpened = false" title="Вы точно хотите завершить?">
                <Button @click="stopQuizPopupOpened = false">Вернуться</Button>
                <Button @click="stopQuizPopupOpened = false; stop()">Завершить</Button>
            </PopupWindow>
            <PopupWindow v-if="timeOutPopupOpened" title="Время вышло">
                <Button @click="timeOutPopupOpened = false">Посмотреть ответы</Button>
                <Button @click="timeOutPopupOpened = false; stop()">Завершить</Button>
            </PopupWindow>
        </Teleport>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref, watch, computed } from 'vue';
import { Api } from '../../api';
import { useAppStore } from '../../stores/app';
import { storeToRefs } from 'pinia';
import { Icon } from "@iconify/vue";
import SelectBox from '../../components/Quiz/SelectBox.vue';
import BottomButton from '../../components/UI/BottomButton.vue';
import PopupWindow from '../../components/UI/PopupWindow.vue';
import Button from '../../components/UI/Button.vue';

const api = new Api();
const app = useAppStore();

const { token, quizResults } = storeToRefs(app);

const router = useRouter();

const page = ref<{
    quiz: Quiz;
    question: Question | null;
}>();

const stopQuizPopupOpened = ref(false);
const timeOutPopupOpened = ref(false);

const isTimeOver = computed(() => {
    return now.value.getTime() >= new Date(page.value!.quiz.endTime).getTime()
})

const currentStage = computed(() => {
    return page.value!.question!.metadata.correctOptionIndex != null ? "check" : "test";
})

const isGoingNextAvailable = computed(() => {
    //TODO заменить заглушку на будущее условие для обязательных ответов на вопросы
    return true ? (true || isTimeOver.value) : page.value!.question!.metadata.selectedOption == null
})

async function load(){
    try {
        const data = await api.getQuizPage();

        if(!data.ok) return;

        page.value = data.response;

        if (data.response.quiz.endTime && new Date(data.response.quiz.endTime).getTime() <= Date.now()) {
            return timeOutPopupOpened.value = true;
        };

        if(!data.response.question) return;
    } catch (err) {
        console.error(err);
    }
}

async function next(){
    if((page.value!.quiz.currentPage + 1) == page.value!.quiz.totalQuestions /*&& page.value!.question?.metadata.correctOptionIndex != null*/){ // в идеале должно быть полное условие
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

const progressBarTransform = () => {
    return `translateX(${((page.value!.quiz.currentPage + 1) / page.value!.quiz.totalQuestions) * 100 - 100}%)`;
}

const timer = ref<NodeJS.Timeout>();
const now = ref(new Date());

onMounted(async () => {
    if(page.value) return;

    await load();

    watch(token, () => {
        if(token.value) load();
    });

    timer.value = setInterval(() => {
        now.value = new Date();
        checkTimer();
    }, 1000);
})

onUnmounted(() => {
    if (timer.value) clearInterval(timer.value);
})

function checkTimer(){
    if(!page.value!.quiz.endTime) return;

    const endTime = new Date(page.value!.quiz.endTime).getTime();
    const nowTime = now.value.getTime();
    if(nowTime >= endTime){
        timeOutPopupOpened.value = true;
        if (timer.value) clearInterval(timer.value);
    }
}

function testTime(timeLimit: number){
    const minutes = Math.floor(timeLimit / 60);
    const seconds = timeLimit % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function timeLeft() {
    if (!page.value || !page.value.quiz.endTime) return "00:00";
    const dateEnd = new Date(page.value.quiz.endTime);

    const ms = dateEnd.getTime() - now.value.getTime();

    if(ms <= 0) return "00:00";

    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
</script>
<style lang="scss" scoped>
@use "../../assets/scss/page" as *;
@use "../../assets/scss/mixins" as *;

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
        gap: 8px;

        .stop {
            width: 2rem;
            height: 2rem;
        }

        .progress {
            flex: 1;
            background-color: #d9d9d9;
            border-radius: 20px;
            overflow: hidden;

            .progress-bar {
                @include smooth;
                height: 1.1rem;
                background-color: var(--color-accent);
                border-radius: inherit;
            }
        }

        .timer {
            color: var(--color-hint);
            font-size: 1.1rem;
            font-variant-numeric: tabular-nums;
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