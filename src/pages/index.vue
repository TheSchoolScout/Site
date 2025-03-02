<template>
    <div class="page">
        <div class="buttons-container">
            <RouterLink class="btn" to="/start"><Button>Пройти тест</Button></RouterLink>
            <RouterLink class="btn" to="/themes"><Button>Темы</Button></RouterLink>
            <RouterLink class="btn" to="/history"><Button>История тестов</Button></RouterLink>
        </div>
        <div class="logo">SchoolScout</div>
    </div>
</template>
<script lang="ts" setup>
import Button from '../components/UI/Button.vue';
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
@use "../assets/scss/menu" as *;
</style>