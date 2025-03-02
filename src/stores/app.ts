import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
    const confirmToken = ref("");
    const token = ref("");

    const quizResults = ref({
        correctAnswers: 0,
        totalQuestions: 0,
    });

    const currentUser = ref<User>({
        user_id: 0,
        rank: "user",
        name: "",
        surname: "",
        is_testing: false,
        is_daily_available: false,
    });

    return {
        confirmToken,
        token,

        quizResults,

        currentUser,
    };
});