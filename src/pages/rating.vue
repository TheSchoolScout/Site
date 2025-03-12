<template>
    <div class="page">{{ rating }}</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Api } from '../api';

const api = new Api();

const rating = ref<User[]>([]);
const data = await api.getRating();

if (data.ok) {
    rating.value = data.response.users;
}
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
</style>