<template>
    <div class="item" @click="$router.replace(`/quiz/result/${data.id}`)">
        <div class="score">{{ data.correct_answers }}/{{ data.questions_count }} ({{ Math.round(data.correct_answers / data.questions_count * 100) }}%)</div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    data: HistoryItem;
}>();
</script>
<style lang="scss" scoped>
@use "../../assets/scss/mixins" as *;

.item {
    @include ripple;

    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;

    .icon {
        height: 36px;
        width: 36px;
    }
}
</style>