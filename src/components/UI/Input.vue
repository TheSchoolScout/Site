<template>
    <input v-model="model">
</template>
<script lang="ts" setup>
const model = defineModel<string>();
</script>
<style lang="scss" scoped>
input {
    outline: 0;
    border: none;
    background-color: var(--color-bg-secondary);
    border-radius: 8px;
    height: 45px;
    font-size: 1rem;
    padding: 0 8px;
    color: var(--color-text);
}
</style>