<template>
    <div class="select-box">
        <div v-for="(option, i) in props.question.metadata.options" class="option" :class="{'active': model == i, 'correct': correct == i}" @click="!disabled && (model = i)">{{ option }}</div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    question: Question;
    correct: number | null;
    disabled: boolean
}>();

const model = defineModel<number | null>();
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
        background-color: var(--color-bg-secondary);
        color: var(--color-text-secondary);
        border-radius: 8px;
        transition: 0.3s;

        &.active {
            background-color: var(--color-accent);
            color: var(--color-text);
        }

        &.correct:not(.active) {
            border: 1.5px solid green;
        }
    }
}
</style>