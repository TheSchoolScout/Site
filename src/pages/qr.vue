<template>
    <div class="page">
        <img :src="qr">
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useAppStore } from '../stores/app';
import QRCode from "qrcode";
import eventBus from '../eventBus';
import { storeToRefs } from 'pinia';

const app = useAppStore();
const qr = ref("");

const { bottomButtons } = storeToRefs(app);

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

onMounted(() => {
    app.addBottomButton({
        text: "Проверить",
        action: () => check()
    });
})

onUnmounted(() => {
    bottomButtons.value = [];
})

function check(){
    console.log('check');
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