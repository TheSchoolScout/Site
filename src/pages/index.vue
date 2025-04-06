<template>
    <div class="page">
        <Header/>
        <section>
            <header>
                <div class="title">Типы задач</div>
            </header>
            <TasksMenu class="container"/>
        </section>
        <section>
            <header>
                <div class="title">Архив тестов</div>
            </header>
        </section>
    </div>
</template>
<script lang="ts" setup>
import Header from '../components/Main/Header.vue';
import TasksMenu from '../components/Main/TasksMenu.vue';
</script>
<style lang="scss">
@use "../assets/scss/page" as *;
@use "../assets/scss/menu" as *;
</style>