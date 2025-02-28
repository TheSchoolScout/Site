import { ofetch } from "ofetch"

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";
type Routes = 
    "init"
    | "history"
    | "quiz/random"
    | "quiz/random-theme"
    | "quiz/theme"
    | "quiz/stop"
    | "quiz/answer"
    | "quiz/page/get"
    | "quiz/page/next"
    | "processing/id"
    | "processing/active"
    | "processing/closed"
    | "themes/upload"
    | "themes/get"

interface InitRequestParams {
    initData: string;
}

interface InitRequestResponse {

}

export class Api {
    public init = (data: InitRequestParams) =>{
        return request<InitRequestParams, InitRequestResponse>("init", "PUT", data);
    }
}

function request<T, K>(route: Routes, method: RequestMethod, data?: T): Promise<K>{
    return ofetch<K>(`https://${import.meta.env.VITE_APP_BACKEND_URL}/${route}`, {
        method: method,
        ...(method != "GET" ? data && { body: data } : data && { query: data }),
    });
};