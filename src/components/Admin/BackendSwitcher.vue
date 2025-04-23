<template>
    <div class="backend-switcher">
        <div class="choose-backend" @click="showBackendSwitcher = true">
            <Icon class="icon" icon="material-symbols:settings-ethernet-rounded" width="36" height="36" />
            <div class="text">Сменить бэкэнд</div>
            <Icon class="arrow" icon="material-symbols:arrow-forward-ios-rounded" />
        </div>
        <Teleport to="#teleports">
            <PopupWindow v-if="showBackendSwitcher" title="Выбор бэкенда" @close="showBackendSwitcher = false">
                <Input class="backend-url" v-model="url" placeholder="URL бэкенда" />
                <Button @click="save">Сохранить</Button>
                <Button @click="showBackendSwitcher = false">Закрыть</Button>
            </PopupWindow>
        </Teleport>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import PopupWindow from '../UI/PopupWindow.vue';
import Input from '../UI/Input.vue';
import Button from '../UI/Button.vue';
import { useAppStore } from '../../stores/app';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['close', 'pick']);

const app = useAppStore();
const { backendUrl } = storeToRefs(app);

const url = ref(backendUrl.value)
const showBackendSwitcher = ref(false);

function save(){
    app.setBackendUrl(url.value);
    showBackendSwitcher.value = false;
    window.location.reload();
}
</script>
<style lang="scss" scoped>
@use "../../assets/scss/mixins" as *;
.choose-backend {
    @include ripple;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    border-radius: 8px;
    cursor: pointer;

    .icon {
        background-color: #0da570;
        border-radius: 8px;
    }

    .text {
        flex: 1;
    }

    .arrow {
        color: var(--color-hint);
    }
}

.backend-url {
    width: 100%;
}
</style>