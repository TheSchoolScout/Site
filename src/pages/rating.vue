<template>
    <div class="page">
        {{ rating }}
        <div class="rating">
            <div class="leaders">
                <div class="second">
                    <img class="avatar">
                    <div class="name"></div>
                </div>
                <div class="first">
                    <img class="avatar">
                </div>
                <div class="third">
                    <img class="avatar">
                </div>
            </div>
            <div class="users">
                <div class="user" v-for="user in users">{{ user }}</div>
            </div>
        </div>
        <BottomButton path="/">Назад</BottomButton>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Api } from '../api';
import BottomButton from '../components/UI/BottomButton.vue';

const api = new Api();

const rating = ref<User[]>([]);
const data = await api.getRating();

const users = computed(() => rating.value.splice(0, 3));

if (data.ok) {
    rating.value = data.response.users;
}
</script>
<style lang="scss" scoped>
@use "../assets/scss/page" as *;

.rating {
    display: flex;
    flex-direction: column;
}
</style>