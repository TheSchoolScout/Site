<template>
    <div class="page">
        <Button @click="$router.replace('/admin/upload')">Загрузить тему</Button>

        <section>
            <header>
                <div class="title">Обработка тем</div>
            </header>
            <div class="container">
                <ProcessingList/>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
import ProcessingList from '../../components/Admin/ProcessingList.vue';
import Button from '../../components/UI/Button.vue';

</script>
<style lang="scss" scoped>
@use "../../assets/scss/page" as *;
</style>