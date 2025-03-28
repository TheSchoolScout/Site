declare global {
    interface User {
        avatar: string;
        user_id: number;
        rank: "user" | "assistant" | "teacher" | "admin" | "none";
        name: string;
        surname: string;
        uuid: string;
        rating: number;
        streak: number;
        group: Group;
    }

    type Group = IGroup | null;

    interface IGroup {
        group_id: number;
        name: string;
    }

    interface Question {
        questionType: string;
        metadata: {
            questionText: string;
            options: string[];
            correctOptionIndex: number | null;
            memorizationTip: string | null;
            selectedOption: number | null;
            canEdit: boolean;
        };
    }

    interface Quiz {
        currentPage: number;
        type: "personal" | "group" | "daily";
        title: string | null;
        totalQuestions: number;
        startTime: string;
        endTime: string;
        timeLimit: number;
    }

    interface Theme {
        id: number;
        title: string;
        questions_count: number;
    }

    interface BottomButton {
        text: string;
        action?: () => void;
        path?: string;
        disabled?: boolean;
    }

    interface HistoryItem {
        id: number;
        status: "pending" | "completed";
        linked_user: User;
        metadata: {
            title: string;
            questions: Question[];
        };
        time_start: string | null;
        time_taken: string | null;
        time_limit: string | null;
        questions_count: number;
        correct_answers: number;
    }
}