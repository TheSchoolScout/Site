<template>
    <div class="page">
        <div class="buttons-container">
            <RouterLink class="btn" to="/quiz/start"><Button>Пройти тест</Button></RouterLink>
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
</style>
<style lang="scss" scoped>
.buttons-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    gap: 8px;

    .btn {
        color: inherit;
        text-decoration: none;

        & button {
            width: 100%;
        }
    }
}
.logo {
    color: var(--color-text-secondary);
    margin: 0 auto;
    font-weight: bold;
}
</style>