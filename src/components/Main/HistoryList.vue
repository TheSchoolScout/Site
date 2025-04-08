<template>
    <div v-if="history.length > 0" class="history-list">
        <HistoryItem v-for="item in history" :data="item"/>
    </div>
    <div v-else class="empty-history">
        <span>История пуста</span>
    </div>
</template>
<script setup lang="ts">
import { Api } from '../../api';
import { ref } from 'vue';
import HistoryItem from './HistoryItem.vue';

const api = new Api();

const history = ref<HistoryItem[]>([]);
const data = await api.getHistory();

if (!data.ok) {
    console.error(data.response.description);
} else {
    history.value = data.response.history;
}
</script>
<style lang="scss" scoped>
.history-list {
    background-color: var(--color-bg-secondary);
    border-radius: 8px;
    overflow: hidden;
}
</style>
