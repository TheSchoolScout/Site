<template>
    <div class="bottom-button">
        <template v-if="props.path">
            <RouterLink :to="props.path"><Button :disabled="props.disabled"><slot/></Button></RouterLink>
        </template>
        <template v-else>
            <Button :disabled="props.disabled"><slot/></Button>
        </template>
    </div>
</template>
<script lang="ts" setup>
import Button from './Button.vue';

const props = defineProps<{
    disabled?: boolean;
    path?: string;
}>()
</script>
<style lang="scss" scoped>
.bottom-button {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    overflow: hidden;
    height: 44px;

    button, a button {
        border-radius: 8px 8px 0 0;
        border-bottom: none;
        position: absolute;
        left: -1.5px;
        right: -1.5px;
        top: 0;
        height: 40px;
        box-sizing: content-box;
    }

    a {
        text-decoration: none;
        color: var(--color-btn-text);
    }
}
</style>