<template>
    <div class="page">
        <div class="stat-container">
            <div class="circle">{{ quizResults.correctAnswers }} из {{ quizResults.totalQuestions }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAppStore } from '../../stores/app';
import { onMounted, onUnmounted } from 'vue';

const app = useAppStore();
const router = useRouter();

const { quizResults, bottomButtons } = storeToRefs(app);

onMounted(() => {
    app.addBottomButton({
        text: "Завершить",
        action: () => router.replace("/")
    })
})

onUnmounted(() => {
    bottomButtons.value = [];
})
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