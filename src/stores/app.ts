import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
    const confirmToken = ref("");
    const token = ref("");

    const quizResults = ref({
        correctAnswers: 0,
        totalQuestions: 0,
    });

    const isLoading = ref(true);
    const fatalError = ref({
        message: ""
    })

    const me = ref<{
        user: User;
        is_daily_available: boolean;
        is_testing: boolean;
    }>();

    return {
        confirmToken,
        token,

        isLoading,
        fatalError,

        quizResults,

        me,
    };
});