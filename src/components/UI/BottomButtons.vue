<template>
    <div class="bottom-buttons">
        <template v-for="button in bottomButtons">
            <template v-if="button.path">
                <RouterLink :to="button.path"><Button @click="button.action && button.action()">{{ button.text }}</Button></RouterLink>
            </template>
            <template v-else>
                <Button @click="button.action && button.action()">{{ button.text }}</Button>
            </template>
        </template>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores/app';
import Button from './Button.vue';

const app = useAppStore();
const { bottomButtons } = storeToRefs(app);
</script>
<style lang="scss" scoped>
.bottom-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 8px 8px 0 0;
    overflow: hidden;

    button {
        border-radius: unset;
        width: 100%;
    }

    a {
        text-decoration: none;
        color: var(--color-btn-text);

        button {
            width: 100%;
        }
    }
}
</style>