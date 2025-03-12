<template>
    <div class="page">
        <img :src="qr">
        <BottomButton @click="check">Проверить</BottomButton>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAppStore } from '../stores/app';
import QRCode from "qrcode";
import eventBus from '../eventBus';
import BottomButton from '../components/UI/BottomButton.vue';

const app = useAppStore();
const qr = ref("");


onMounted(async () => {
    qr.value = await generateQR();
})

function generateQR(){
    return new Promise<string>(async (resolve, reject) => {
        try {
            resolve(await QRCode.toDataURL(app.confirmToken))
        } catch (err) {
            reject(err);
        }
    })
}

function check(){
    eventBus.emit("reloadInit");
}
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
</style>
<style lang="scss" scoped>
.page {
    justify-content: center;
}

img {
    border-radius: 8px;
}
</style>