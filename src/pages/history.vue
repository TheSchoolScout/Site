<template>
    <div class="page">
        {{ history }}
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/app';
import { onMounted, onUnmounted, ref } from 'vue';
import { Api } from '../api';

const app = useAppStore();
const api = new Api();

const { bottomButtons, fatalError } = storeToRefs(app);

const history = ref<HistoryItem[]>([]);

const data = await api.getHistory();

if (data.ok) {
    history.value = data.response.history;
} else {
    fatalError.value.message = data.response.description;
}

onMounted(() => {
    app.addBottomButton({
        text: "Назад",
        path: "/"
    })
})

onUnmounted(() => {
    bottomButtons.value = [];
})
</script>