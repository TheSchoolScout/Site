<template>
    <div class="page">
        <h2>Новая тема</h2>
        <Button @click="chooseFile">Выбрать файл</Button>
        <div v-if="processing" class="processing">
            <div class="status" :class="processing.status">{{ processingStatus[processing.status] }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Button from '../../components/UI/Button.vue';
import { Api } from '../../api';
import { ref } from 'vue';

const api = new Api();

const processing = ref<Processing>();
let processingCheck: NodeJS.Timeout | null = null;

const processingStatus = {
    pending: "Ожидание",
    processing: "Обработка",
    completed: "Успешно загружено",
    failed: "Ошибка при загрузке"
};

function chooseFile(){
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".docx, .doc";

    input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        
        const upload = await api.uploadTheme(formData);
        if(!upload.ok) return;

        const processingData = await api.getProcessing(upload.response.processing_id);
        if(!processingData.ok) return;

        processing.value = processingData.response.processing;

        processingCheck = setInterval(checkProcessing, 10000);
    };

    input.click();
}

async function checkProcessing(){
    if(!processing.value) return;

    const data = await api.getProcessing(processing.value.processing_id);
    if(!data.ok) return;

    processing.value = data.response.processing;
    switch(processing.value.status){
        case "failed":
        case "completed":
            if(processingCheck) clearInterval(processingCheck);
            processingCheck = null;
            break;
    }
}
</script>
<style lang="scss" scoped>
@use "../../assets/scss/page" as *;

.processing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    background-color: var(--color-bg-secondary);
    border-radius: 8px;

    .status {
        font-size: 1.2rem;
        font-weight: bold;

        &.completed {
            color: var(--color-success);
        }

        &.failed {
            color: var(--color-error);
        }
    }
}
</style>