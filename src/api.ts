import { ofetch } from "ofetch"
import { useAppStore } from "./stores/app";
import { storeToRefs } from "pinia";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface SuccessResponse<T> {
    ok: true;
    response: T;
}

export interface ErrorResponse {
    ok: false;
    response: {
        exception: string;
        description: string;
    };
}

// /init
interface InitRequestParams {
    initData: string;
}

interface InitRequestResponse {
    token: string;
    user: User;
    is_testing: boolean;
    is_daily_available: boolean;
}
// /registration
interface RegisterRequestParams {
    initData: string;
    name: string;
    surname: string;
    gender: "male" | "female";
}

interface RegisterRequestResponse {
    confirm_token: string;
}
// /quiz/stop
interface QuizStopRequestResponse {
    correctAnswers: number;
    totalQuestions: number;
}
// /quiz/answer
interface QuizAnswerRequestParams {
    page: number;
    answer: number;
}
// /quiz/page
interface QuizPageRequestResponse {
    question: Question;
    quiz: Quiz;
}
// /quiz/page/next
interface QuizNextPageRequestResponse {
    question: Question;
    quiz: Quiz;
}
// /quiz/random-theme
interface QuizRandomThemeRequestParams {
    count: number;
}
// /quiz/theme/:id
interface QuizThemeRequestParams {
    count: number;
}

// /quiz/random
interface QuizRandomRequestParams {
    count: number;
}

// /me
interface GetMeRequestResponse {
    user: User;
    is_daily_available: boolean;
    is_testing: boolean;
}

// /themes
interface GetThemesRequestResponse {
    themes: Theme[]
}

// /me/history
interface GetHistoryRequestParams {
    offset?: number;
}

interface GetHistoryRequestResponse {
    history: HistoryItem[];
    more: boolean;
}

// /rating
interface GetRatingRequestResponse {
    users: User[];
}

// /me/streak
interface GetStreakRequestParams {
    year: number;
    month: number;
}

interface GetStreakRequestResponse {
    streak: string[];
}

// /user/:id
interface GetUserRequestResponse {
    user: User;
    is_testing: boolean;
    is_daily_available: boolean;
}

interface UpdateUserRequestResponse {
    rank: "assistant" | "teacher" | "admin" | "none";
    group_id: number;
}

// /theme/upload
interface UploadThemeRequestResponse {
    processing_id: number;
}

// /processing/:id
interface ProcessingRequestResponse {
    processing: Processing;
}

// /processing/active
interface ProcessingActiveRequestResponse {
    processings: Processing[];
}

// /processing/closed
interface ProcessingClosedRequestParams {
    offset?: number;
}
interface ProcessingClosedRequestResponse {
    processings: Processing[];
}

// /confirm/:token
interface GetConfirmRequestResponse {
    user: User;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export class Api {
    public init = (data: InitRequestParams) => {
        return request<InitRequestParams, ApiResponse<InitRequestResponse>>("init", "PUT", data);
    };

    public register = (data: RegisterRequestParams) => {
        return request<RegisterRequestParams, ApiResponse<RegisterRequestResponse>>("registration", "PUT", data);
    };

    // quiz
    public stopQuiz = () => {
        return request<undefined, ApiResponse<QuizStopRequestResponse>>("quiz/stop", "POST");
    };

    public answerQuiz = (data: QuizAnswerRequestParams) => {
        return request<QuizAnswerRequestParams, ApiResponse<undefined>>("quiz/answer", "PUT", data);
    };

    public getQuizPage = () => {
        return request<undefined, ApiResponse<QuizPageRequestResponse>>("quiz/page", "GET");
    };

    public getQuizNextPage = () => {
        return request<undefined, ApiResponse<QuizNextPageRequestResponse>>("quiz/page/next", "PUT");
    };

    public dailyQuiz = () => {
        return request<undefined, ApiResponse<undefined>>("quiz/daily", "POST");
    };

    public randomQuizTheme = (data: QuizRandomThemeRequestParams) => {
        return request<QuizRandomThemeRequestParams, ApiResponse<undefined>>("quiz/random-theme", "POST", data);
    };

    public quizTheme = (data: QuizThemeRequestParams, themeId: number) => {
        return request<QuizThemeRequestParams, ApiResponse<undefined>>(`quiz/theme/${themeId}`, "POST", data);
    };

    public randomQuiz = (data: QuizRandomRequestParams) => {
        return request<QuizRandomRequestParams, ApiResponse<undefined>>("quiz/random", "POST", data);
    };

    // themes
    public getThemes = () => {
        return request<undefined, ApiResponse<GetThemesRequestResponse>>("themes", "GET");
    };

    public uploadTheme = (fd: FormData) => {
        return request<FormData, ApiResponse<UploadThemeRequestResponse>>("themes/upload", "POST", fd);
    };

    // user
    public getMe = () => {
        return request<undefined, ApiResponse<GetMeRequestResponse>>("me", "GET");
    };

    public getHistory = (data?: GetHistoryRequestParams) => {
        return request<GetHistoryRequestParams, ApiResponse<GetHistoryRequestResponse>>("me/history", "GET", data);
    };

    public getRating = () => {
        return request<undefined, ApiResponse<GetRatingRequestResponse>>("rating", "GET");
    };

    public getStreak = () => {
        return request<GetStreakRequestParams, ApiResponse<GetStreakRequestResponse>>("me/streak", "GET");
    };

    public getUser = (user_id: string) => {
        return request<undefined, ApiResponse<GetUserRequestResponse>>(`user/${user_id}`, "GET");
    };

    public updateUser = (user_id: string) => {
        return request<undefined, ApiResponse<UpdateUserRequestResponse>>(`user/${user_id}`, "PUT");
    };

    // processing
    public getProcessing = (processing_id: number) => {
        return request<undefined, ApiResponse<ProcessingRequestResponse>>(`processing/${processing_id}`, "GET");
    };

    public getActiveProcessings = () => {
        return request<undefined, ApiResponse<ProcessingActiveRequestResponse>>("processing/active", "GET");
    };

    public getClosedProcessings = (data?: ProcessingClosedRequestParams) => {
        return request<ProcessingClosedRequestParams, ApiResponse<ProcessingClosedRequestResponse>>(
            "processing/closed",
            "GET",
            data
        );
    };

    //confirm
    public validateConfirmToken = (token: string) => {
        return request<undefined, ApiResponse<GetConfirmRequestResponse>>(`confirm/${token}`, "GET");
    }

    public confirm = (token: string) => {
        return request<undefined, ApiResponse<undefined>>(`confirm/${token}`, "PUT");
    };
}

function request<T, K>(route: string, method: RequestMethod, data?: T): Promise<K | ErrorResponse> {
    const app = useAppStore();

    const { token, backendUrl } = storeToRefs(app);

    return ofetch<K | ErrorResponse>(`${backendUrl.value}/${route}`, {
        method: method,
        ...(method != "GET" ? data && { body: data } : data && { query: data }),
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });
};