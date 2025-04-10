<template>
    <div class="page">
        <h2>Подтверждение регистрации</h2>
        <div v-if="user" class="confirmation">
            <div class="surname">Фамилия: {{ user.surname }}</div>
            <div class="name">Имя: {{ user.name }}</div>
            <Button class="confirm" @click="confirm">Подтвердить</Button>
            <Button class="reject" @click="exit">Отклонить</Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Api } from '../../api';
import { ref } from 'vue';
import Button from '../../components/UI/Button.vue';

const router = useRouter();
const api = new Api();

const webApp = window.Telegram.WebApp;

const user = ref<User>();
const token = ref("");

webApp.showScanQrPopup({});
webApp.onEvent("qrTextReceived", async (event: {data: string}) => {
    token.value = event.data;
    if(!event.data){
        webApp.showAlert("Ошибка: не удалось получить данные из QR-кода.");
        return exit();
    }
    try {
        const data = await api.validateConfirmToken(token.value);
        
        if(!data.ok){
            webApp.showAlert("Ошибка: " + data.response.description);
            return exit();
        }

        user.value = data.response.user;
        webApp.closeScanQrPopup();
    } catch (error: any) {
        webApp.showAlert("Ошибка: " + error.data.response.description);
        return exit();
    }
})

webApp.onEvent("scanQrPopupClosed", () => {
    if(!user.value) exit();
});

webApp.BackButton.show();
webApp.BackButton.onClick(() => exit());

function exit(){
    webApp.closeScanQrPopup();
    router.replace("/admin");
    webApp.BackButton.hide();
}

async function confirm(){
    if(!user.value) return;

    try {
        const data = await api.confirm(token.value);
        if(!data.ok){
            webApp.showAlert(data.response.description);
            console.error(data.response.description);
            return webApp.showScanQrPopup({});
        }

        webApp.showAlert("Пользователь успешно подтверждён!");
        exit();
    } catch (error: any) {
        webApp.showAlert(error.data.response.description);
        console.error(error.data.response.description);
        return webApp.showScanQrPopup({});
    }
}
</script>
<style lang="scss" scoped>
@use "../../assets/scss/page" as *;

.confirmation {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 12px;
    background-color: var(--color-bg-secondary);
    border-radius: 8px;
}
</style>