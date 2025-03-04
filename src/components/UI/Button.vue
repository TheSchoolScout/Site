<template>
    <button :class="{disabled: props.disabled}" :disabled="props.disabled"><slot/></button>
</template>
<script lang="ts" setup>
const props = defineProps<{
    disabled?: boolean;
}>()
</script>
<style lang="scss" scoped>
button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-btn);
    border: 1.5px solid var(--color-btn-border);
    color: var(--color-btn-text);
    outline: none;
    border-radius: 8px;
    height: 45px;
    font-weight: 400;
    font-size: 1.05rem;
    cursor: pointer;
    transition: 0.3s;
    user-select: none;

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover{
        background-color: var(--color-btn-secondary);
    }
}
</style>