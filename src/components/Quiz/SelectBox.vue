<template>
    <div class="select-box" :class="{disabled: disabled}">
        <div 
            v-for="(option, i) in props.question.metadata.options" 
            class="option" 
            :class="{'active': question.metadata.selectedOption == i, 'correct': question.metadata.correctOptionIndex == i, 'skeleton-loading': loadingIndex == i}" 
            @click="!disabled && selectAnswer(i)">{{ option }}</div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { Api } from "../../api";

const props = defineProps<{
    question: Question;
    quiz?: Quiz;
}>();

const api = new Api();

const loadingIndex = ref<number>();

const disabled = computed(() => {
    return props.quiz && (props.question.metadata.correctOptionIndex != null 
    || new Date().getTime() >= new Date(props.quiz.endTime).getTime())
});


async function selectAnswer(i: number) {
    if (!props.quiz) return;
    
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
        animation: wrong-answer .9s;
    }
}

@keyframes wrong-answer {
    0%, 20%, 40%, 60%, 80%, 100% {
        transform: translateX(-1px);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(1px);
    }
}
</style>