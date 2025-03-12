<template>
    <button :class="{disabled: props.disabled}" :disabled="props.disabled"><slot/></button>
</template>
<script lang="ts" setup>
const props = defineProps<{
    disabled?: boolean;
}>()
</script>
<style lang="scss" scoped>
@use "../../assets/scss/mixins" as *;

button {
    @include smooth;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-btn);
    border: 1.5px solid var(--color-btn-border);
    color: var(--color-btn-text);
    border-radius: 8px;
    height: 45px;
    font-weight: 400;
    font-size: 1.05rem;
    user-select: none;

    &.disabled {
        background-color: var(--color-btn-disabled);
        color: var(--color-btn-disabled-text);
        border-color: var(--color-btn-disabled-border);
        cursor: not-allowed;
    }

    &:not(.disabled):hover{
        background-color: var(--color-btn-secondary);
    }
}
</style>