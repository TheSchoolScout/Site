<template>
    <div class="page">
        <h2>Произошла ошибка</h2>
        <p>{{ fatalError.message }}</p>
        <Button @click="reload">Перезагрузить</Button>
    </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '../stores/app';
import Button from '../components/UI/Button.vue';
import { storeToRefs } from 'pinia';

const app = useAppStore();

const { fatalError } = storeToRefs(app);

function reload() {
    window.location.reload();
}
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
</style>