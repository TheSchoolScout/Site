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

interface InitRequestParams {
    initData: string;
}

interface InitRequestResponse {
    token: string;
    user: User;
    is_testing: boolean;
    is_daily_available: boolean;
}

interface RegisterRequestParams {
    initData: string;
    name: string;
    surname: string;
    gender: "male" | "female";
}

interface RegisterRequestResponse {
    confirm_token: string;
}

interface QuizStopRequestResponse {
    correctAnswers: number;
    totalQuestions: number;
}

interface QuizAnswerRequestParams {
    page: number;
    answer: number;
}

interface QuizPageRequestResponse {
    question: Question;
    quiz: Quiz;
}

interface QuizNextPageRequestResponse {
    question: Question;
    quiz: Quiz;
}

interface QuizRandomThemeRequestParams {
    count: number;
}

interface QuizThemeRequestParams {
    count: number;
}

interface QuizRandomRequestParams {
    count: number;
}

interface GetMeRequestResponse {
    user: User;
    is_daily_available: boolean;
    is_testing: boolean;
}

interface GetThemesRequestResponse {
    themes: Theme[]
}

interface GetHistoryRequestParams {
    offset?: number;
}

interface GetHistoryRequestResponse {
    history: HistoryItem[];
    more: boolean;
}

interface GetRatingRequestResponse {
    users: User[];
}

interface GetStreakRequestParams {
    year: number;
    month: number;
}

interface GetStreakRequestResponse {
    streak: string[];
}

interface GetUserRequestResponse {
    user: User;
    is_testing: boolean;
    is_daily_available: boolean;
}

interface UpdateUserRequestResponse {
    rank: "assistant" | "teacher" | "admin" | "none";
    group_id: number;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export class Api {
    public init = (data: InitRequestParams) => {
        return request<InitRequestParams, ApiResponse<InitRequestResponse>>("init", "PUT", data);
    };

    public register = (data: RegisterRequestParams) => {
        return request<RegisterRequestParams, ApiResponse<RegisterRequestResponse>>("registration", "PUT", data);
    };

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

    public getMe = () => {
        return request<undefined, ApiResponse<GetMeRequestResponse>>("me", "GET");
    };

    public getThemes = () => {
        return request<undefined, ApiResponse<GetThemesRequestResponse>>("themes", "GET");
    };

    public getHistory = () => {
        return request<GetHistoryRequestParams, ApiResponse<GetHistoryRequestResponse>>("me/history", "GET");
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
}

function request<T, K>(route: string, method: RequestMethod, data?: T): Promise<K | ErrorResponse> {
    const app = useAppStore();

    const { token } = storeToRefs(app);

    return ofetch<K | ErrorResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}/${route}`, {
        method: method,
        ...(method != "GET" ? data && { body: data } : data && { query: data }),
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
    });
};