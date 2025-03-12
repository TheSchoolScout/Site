<template>
    <div class="page">
        <div class="stat-container">
            <div class="circle">{{ quizResults.correctAnswers }} из {{ quizResults.totalQuestions }}</div>
        </div>
        <BottomButton path="/">Закрыть</BottomButton>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores/app';
import BottomButton from '../../components/UI/BottomButton.vue';

const app = useAppStore();

const { quizResults } = storeToRefs(app);
</script>
<style lang="scss">
@use "../../assets/scss/page" as *;
</style>
<style lang="scss" scoped>
.stat-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        width: 200px;
        font-size: 2rem;
        font-weight: 600;
        background: radial-gradient(#0F3732, rgba(42, 157, 144, 0));
        border-radius: 50%;
    }
}
</style>