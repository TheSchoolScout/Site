<template>
    <div class="page">
        <div>{{ history }}</div>
        <BottomButton path="/">Назад</BottomButton>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '../stores/app';
import { ref } from 'vue';
import { Api } from '../api';
import BottomButton from '../components/UI/BottomButton.vue';

const app = useAppStore();
const api = new Api();

const { fatalError } = storeToRefs(app);

const history = ref<HistoryItem[]>([]);

const data = await api.getHistory();

if (data.ok) {
    history.value = data.response.history;
} else {
    fatalError.value.message = data.response.description;
}
</script>