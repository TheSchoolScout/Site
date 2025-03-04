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

    const bottomButtons = ref<BottomButton[]>([]);

    function addBottomButton(data: BottomButton) {
        bottomButtons.value.push(data);
    }

    function removeBottomButton(text: string) {
        const i = bottomButtons.value.map(button => button.text).indexOf(text);
        if (i > -1) {
            bottomButtons.value.splice(i, 1);
        }
    }

    const currentUser = ref<User>({
        user_id: 0,
        rank: "user",
        name: "",
        surname: "",
        uuid: ""
    });

    return {
        confirmToken,
        token,

        isLoading,
        fatalError,

        bottomButtons,
        addBottomButton,
        removeBottomButton,

        quizResults,

        currentUser,
    };
});