<template>
    <div class="select-box" :class="{disabled: question.metadata.correctOptionIndex != null}">
        <div v-for="(option, i) in props.question.metadata.options" class="option" :class="{'active': question.metadata.selectedOption == i, 'correct': question.metadata.correctOptionIndex == i}" @click="!question.metadata.correctOptionIndex != null && selectAnswer(i)">{{ option }}</div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Api } from "../../api";

const props = defineProps<{
    question: Question;
    quiz: Quiz;
}>();

const api = new Api();

const loadingIndex = ref<number>();

async function selectAnswer(i: number){
    loadingIndex.value = i;

    try {
        const data = await api.answerQuiz({
            page: props.quiz.currentPage,
            answer: i,
        });

        if(!data.ok) return;

        loadingIndex.value = undefined;
        props.question.metadata.selectedOption = i;
    } catch (err) {
        console.error(err);
    }
}
</script>
<style lang="scss" scoped>
.select-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;

    .option {
        display: flex;
        align-items: center;
        min-height: 45px;
        padding: 8px;
        border: 1.5px solid var(--color-border);
        color: var(--color-text);
        border-radius: 8px;
        transition: 0.3s;

        &.active {
            border-color: var(--color-warn);
        }

        &.correct, &.active.correct {
            border-color: var(--color-success);
        }
    }

    &.disabled .option.active:not(.correct){
        border-color: var(--color-error);
    }
}
</style>