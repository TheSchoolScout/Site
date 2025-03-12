<template>
    <div class="background" @click.self="emit('close')">
        <div class="box">
            <div class="title">{{ title }}</div>
            <div class="content"><slot/></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    title: string;
}>();

const emit = defineEmits(["close"]);
</script>
<style lang="scss" scoped>
.background {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;

    .box {
        background-color: var(--color-bg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 16px;
        border-radius: 8px 8px 0 0;

        .title {
            font-weight: bold;
            font-size: 1.2rem;
        }

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            width: 100%;

            :deep(button) {
                width: inherit;
            }
        }
    }
}
</style>