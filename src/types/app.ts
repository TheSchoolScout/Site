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

    type ProcessingStatus = "pending" | "processing" | "completed" | "failed";

    interface Processing {
        processing_id: number;
        processing_type: "add_topic";
        status: ProcessingStatus;
        retries: number;
        created_at: string;
        updated_at: string;
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