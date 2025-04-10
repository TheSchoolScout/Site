<template>
    <div class="actions">
        <div class="action" @click="$router.replace('admin/upload')">
            <Icon class="icon upload" icon="material-symbols:upload" width="36" height="36" />
            <div class="name">Загрузить тему</div>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="arrow"/>
        </div>
        <div class="action" v-if="webApp.platform != 'tdesktop'" @click="$router.replace('admin/confirm')">
            <Icon class="icon confirm" icon="material-symbols:account-circle-outline" width="36" height="36" />
            <div class="name">Подтверждение регистрации</div>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="arrow"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const webApp = window.Telegram.WebApp;
</script>
<style lang="scss" scoped>
@use "../../assets/scss/mixins" as *;
.actions {
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-secondary);
    border-radius: 8px;
    overflow: hidden;

    .action {
        @include ripple;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 8px 12px;

        &:not(:last-child) {
            border-bottom: 1.5px solid var(--color-border);
        }

        .icon {
            border-radius: 8px;

            &.upload {
                background-color: #037afe;
            }
            &.confirm {
                background-color: #2ecb5b;
            }
        }

        .name {
            flex: 1;
        }

        .arrow {
            color: var(--color-hint);
        }
    }
}
</style>
