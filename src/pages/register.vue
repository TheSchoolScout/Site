<template>
    <div class="page">
        <form @submit.prevent="register">
            <Input
                placeholder="Имя"
                v-model="name"
                required />
            <Input
                placeholder="Фамилия"
                v-model="surName"
                required />
            <select
                v-model="gender"
                required>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
            </select>

            <Button @click="register">Продолжить</Button>
        </form>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Input from "../components/UI/Input.vue";
import Button from "../components/UI/Button.vue";
import { Api } from "../api";
import { useAppStore } from "../stores/app";
import { storeToRefs } from "pinia";

const api = new Api();
const app = useAppStore();

const router = useRouter();

const { confirmToken } = storeToRefs(app);

const name = ref("");
const surName = ref("");
const gender = ref<"female" | "male">();

async function register() {
    const regExp = /^[a-zA-Zа-яА-ЯәіңғүұқөһӘІҢҒҮҰҚӨҺ\\s\\-]+$/;
    if (!(regExp.test(name.value) && name.value.length >= 2 && name.value.length <= 50)) return;
    if (!(regExp.test(surName.value) && surName.value.length >= 2 && surName.value.length <= 50)) return;

    try {
        const response = await api.register({
            initData: window.Telegram.WebApp.initData,
            name: name.value,
            surname: surName.value,
            gender: gender.value!
        });

        if (!response.ok) return;

        confirmToken.value = response.response.confirm_token;
        router.replace("/qr");
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

select {
    height: 45px;
    border-radius: 8px;
    outline: 0;
    color: var(--color-text-secondary);
    font-size: 1rem;
    padding: 8px;
    border: none;
    background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23ffffff' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
        no-repeat;
    background-color: var(--color-bg-secondary);
    background-position: calc(100% - 0.75rem) center !important;
    -moz-appearance: none !important;
    -webkit-appearance: none !important;
    appearance: none !important;
    padding-right: 2rem !important;
}
</style>
