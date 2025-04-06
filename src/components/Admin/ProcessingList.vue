<template>
    <div class="processing-list">
        <template v-if="active.length > 0">
            <div class="subtitle">Активные</div>
            <div class="items">
                <ProcessingItem v-for="(processing, i) in active" :key="i" :processing="processing"/>
            </div>
        </template>
        <div class="subtitle">Завершенные</div>
        <div class="items">
            <ProcessingItem v-for="(processing, i) in closed" :key="i" :processing="processing"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Api } from '../../api';
import { ref } from 'vue';
import ProcessingItem from './ProcessingItem.vue';

const api = new Api();
const [activeProcessings, closedProcessings] = await Promise.all([api.getActiveProcessings(), api.getClosedProcessings()]);

if(!activeProcessings.ok || !closedProcessings.ok) throw new Error("Failed to fetch processings");

const active = ref(activeProcessings.response.processings);
const closed = ref(closedProcessings.response.processings);
</script>
<style lang="scss" scoped>
.processing-list {
    padding: 8px 12px;
}
</style>