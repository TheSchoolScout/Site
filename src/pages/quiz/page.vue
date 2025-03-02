<template>
    <div class="page">
        <template v-if="page">
            <header class="question-info">
                <div class="counters">
                    <div class="timer">0:29</div>
                    <div class="step">{{ (page.quiz.currentPage + 1) }}/{{ page.quiz.totalQuestions }}</div>
                </div>
                <div class="question">{{ page.question.metadata.questionText }}</div>
            </header>
            <SelectBox :question="page.question" v-model="selected"/>
        </template>
        <Button @click="answer">Далее</Button>
        <Button @click="stop">Завершить досрочно</Button>
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
    question: Question;
}>();
const selected = ref<number>();

async function load(){
    try {
        const data = await api.getQuizPage();

        if(!data.ok) return;

        page.value = data.response;
        /*page.value.question = {
            questionType: "",
            metadata: {
                canEdit: false,
                correctOptionIndex: 0,
                selectedOption: null,
                options: [
                    "Казахи должны были платить ясак, Россия обещала защиту от врагов, прекращение набегов.",
                    "Казахи получали право беспошлинной торговли с Россией.",
                    "Казахи становились полноправными гражданами Российской империи.",
                    "Казахи сохраняли полную независимость во внутренних делах."
                ],
                memorizationTip: "lol",
                questionText: "Какие условия были оговорены при подписании грамоты о принятии Младшего жуза в состав России?"
            }
        }*/
    } catch (err) {
        console.error(err);
    }
}

async function answer(){
    if(!page.value || !selected.value) return;
    try {
        const dataAnswer = await api.answerQuiz({
            page: page.value.quiz.currentPage,
            answer: selected.value
        })
        const dataNext = await api.getQuizNextPage();

        if(!dataAnswer.ok || !dataNext.ok) return;

        page.value = dataNext.response;
    } catch (err) {
        console.error(err);
    }
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
</style>