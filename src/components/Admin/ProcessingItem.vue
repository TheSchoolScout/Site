<template>
    <div class="item">
        <template v-if="processing.status == 'pending'">
            <Icon icon="material-symbols:hourglass-top" class="icon" height="1.5rem" width="1.5rem"/>
        </template>
        <template v-if="processing.status == 'processing'">
            <Icon icon="material-symbols:pending-outline" class="icon" height="1.5rem" width="1.5rem"/>
        </template>
        <template v-if="processing.status == 'completed'">
            <Icon icon="material-symbols:check-circle-outline-rounded" class="icon completed" height="1.5rem" width="1.5rem"/>
        </template>
        <template v-if="processing.status == 'failed'">
            <Icon icon="material-symbols:cancel-outline-rounded" class="icon failed" height="1.5rem" width="1.5rem"/>
        </template>
        <div class="id">{{ processing.processing_id }}</div>
        <div class="finished">{{ processing.updated_at }}</div>
    </div>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue';
defineProps<{
    processing: Processing
}>();
</script>
<style lang="scss" scoped>
.item {
    display: flex;
    padding: 4px;
    gap: 8px;
    align-items: center;

    .icon {
        color: var(--color-hint);
        
        &.completed {
            color: var(--color-success);
        }
        &.failed {
            color: var(--color-error);
        }
    }

    .id {
        flex: 1;
    }

    .finished {
        font-size: 0.9rem;
        color: var(--color-hint);
    }
}
</style>