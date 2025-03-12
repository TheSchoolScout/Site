declare global {
    interface User {
        user_id: number;
        rank: "user" | "admin";
        name: string;
        surname: string;
        uuid: string;
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
        status: "pending";
        linked_user: User;
        metadata: {
            title: string;
            questions: Question[];
        };
        time_start: string;
        time_taken: string;
        time_limit: string;
        questions_count: number;
        correct_answers: number;
    }
}