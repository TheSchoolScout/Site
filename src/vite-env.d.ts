/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface Window {
    Telegram: {
        WebApp: {
            ready: () => void;

            initData: string;
            initDataUnsafe: object;
            BackButton: {
                hide: () => void;
                show: () => void;
                onClick: (callback: () => void) => void;
                offClick: (callback: () => void) => void;
            };
            SettingsButton: {
                isVisible: boolean;
            };

            platform: string;

            setHeaderColor: (color: string) => void;
            setBackgroundColor: (color: string) => void;
            setBottomBarColor: (color: string) => void;

            disableVerticalSwipes: () => void;
            requestFullscreen(): () => void;

            openLink(url: string): () => void;
            openTelegramLink(url: string): () => void;
            openInvoice(url: string): () => void;

            showPopup(params: {
                title: string;
                message: string;
                buttons: { id?: string; type?: "default" | "ok" | "close" | "cancel" | "destructive" }[];
            }): () => void;
            showAlert(message: string, callback?: () => void): () => void;

            onEvent: (event: string, callback: (data: any) => void) => void;
        };
    };
}