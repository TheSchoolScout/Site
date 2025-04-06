<template>
    <div class="bottom-bar">
        <RouterLink class="item" to="/" active-class="active">
            <div class="icon">
                <Icon icon="material-symbols:home-outline-rounded" width="1.5rem" height="1.5rem"/>
                <div class="name">Главная</div>
            </div>
        </RouterLink>
        <RouterLink class="item" to="/rating" active-class="active">
            <div class="icon">
                <Icon icon="material-symbols:kid-star" width="1.5rem" height="1.5rem"/>
                <div class="name">Рейтинг</div>
            </div>
        </RouterLink>
        <RouterLink v-if="me?.user.rank == 'admin'" class="item" to="/admin" active-class="active">
            <div class="icon">
                <Icon icon="material-symbols:admin-panel-settings-outline-rounded" width="1.5rem" height="1.5rem"/>
                <div class="name">Управление</div>
            </div>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useAppStore } from '../stores/app';
import { storeToRefs } from 'pinia';

const app = useAppStore();
const { me } = storeToRefs(app);
</script>

<style lang="scss" scoped>
.bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 90%, transparent 10%) 0%, var(--color-bg) 100%);
    backdrop-filter: blur(6px);
    height: 60px;
    position: sticky;
    position: -webkit-sticky;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    border-top: 1.5px solid var(--color-border);

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--color-hint);
        cursor: pointer;
        padding: 8px 0;

        &.active {
            color: inherit;
        }

        .icon {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;



            .name {
                font-size: 0.7rem;
            }
        }
    }
}
</style>