<template>
    <div class="page">
        <form @submit.prevent="register">
            <Input placeholder="Имя" v-model="name" required/>
            <Input placeholder="Фамилия" v-model="surName" required/>

            <Button @click="register">Продолжить</Button>
        </form>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from '../components/UI/Input.vue';
import Button from '../components/UI/Button.vue';
import { Api } from "../api";
import { useAppStore } from "../stores/app";
import { storeToRefs } from "pinia";

const api = new Api();
const app = useAppStore();

const router = useRouter();

const { confirmToken } = storeToRefs(app);

const name = ref("");
const surName = ref("");

async function register(){
    const regExp = /^[a-zA-Zа-яА-ЯәіңғүұқөһӘІҢҒҮҰҚӨҺ\\s\\-]+$/;
    if(!(regExp.test(name.value) && name.value.length >= 2 && name.value.length <= 50)) return;
    if(!(regExp.test(surName.value) && surName.value.length >= 2 && surName.value.length <= 50)) return;

    try {
        const response = await api.register({
            initData: window.Telegram.WebApp.initData,
            name: name.value,
            surname: surName.value
        })

        if(!response.ok) return;

        confirmToken.value = response.response.confirm_token;
        router.replace("/qr")
    } catch (error: any) {
        console.error(error);
    }
}
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
</style>
<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>