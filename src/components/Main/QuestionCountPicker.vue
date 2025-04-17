<template>
    <Teleport to="#teleports">
        <PopupWindow title="Количество вопросов" @close="emit('close')">
            <div class="count">{{ questionCount }}</div>
            <input type="range" min="1" max="20" v-model="questionCount"/>
            <Button @click="emit('pick', questionCount)">Выбрать</Button>
            <Button @click="emit('close')">Закрыть</Button>
        </PopupWindow>
    </Teleport>
</template>
<script lang="ts" setup>
import Button from '../UI/Button.vue';
import PopupWindow from '../UI/PopupWindow.vue';
import { ref } from 'vue';

const questionCount = ref(15);

const emit = defineEmits(['close', 'pick']);
</script>
<style lang="scss" scoped>
.count {
    font-size: 1.2rem;
    font-weight: bold;
}

input {
    width: 100%;
    accent-color: var(--color-accent);
}
</style>