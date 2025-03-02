declare global {
    interface User {
        user_id: number;
        rank: "user" | "admin";
        name: string;
        surname: string;
        is_testing: boolean;
        is_daily_available: boolean;
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
        startTime: string | null;
        endTime: string | null;
        timeLimit: number;
    }
}