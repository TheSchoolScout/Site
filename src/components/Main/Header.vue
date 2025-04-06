<template>
    <header>
        <div class="avatar">
            <img :src="me?.user.avatar" height="50" width="50"/>
        </div>
        <div class="fire">
            
        </div>
        <div class="stars">
            <Icon icon="material-symbols:kid-star" width="2rem" height="2rem"/>
            <div class="stars-count">{{ me?.user.rating }}</div>
        </div>
    </header>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores/app';
import { Icon } from '@iconify/vue';

const app = useAppStore();

const { me } = storeToRefs(app);
</script>
<style lang="scss" scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    background-color: var(--color-bg);
    z-index: 1;
    height: 60px;

    .avatar {
        border-radius: 32%;
        overflow: hidden;

        img {
            display: block;
        }
    }

    .stars {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #e9c46a;
        font-weight: bold;
        font-size: 1.3rem;
    }
}
</style>