<template>
    <div class="page">
        <Actions/>

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
import { useRouter } from 'vue-router';
import { useAppStore } from '../../stores/app';
import { storeToRefs } from 'pinia';
import Actions from '../../components/Admin/Actions.vue';

const app = useAppStore();
const { me } = storeToRefs(app);

const router = useRouter();

if(me.value?.user.rank != "admin"){
    router.replace("/");
}
</script>
<style lang="scss" scoped>
@use "../../assets/scss/page" as *;
</style>