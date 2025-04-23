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

    const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
    const backendUrl = ref(JSON.parse(localStorage.getItem("settings") || "{}").backendUrl || BACKEND_URL);

    function setBackendUrl(url: string) {
        backendUrl.value = url;
        localStorage.setItem("settings", JSON.stringify({ backendUrl: url }));
    }

    function resetBackendUrl() {
        backendUrl.value = BACKEND_URL || "";
        localStorage.removeItem("settings");
    }

    return {
        confirmToken,
        token,

        isLoading,
        fatalError,

        quizResults,

        me,

        backendUrl,
        setBackendUrl,
        resetBackendUrl,
    };
});