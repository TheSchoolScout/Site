<template>
    <div class="page">
        <div class="themes">
            <div class="theme" v-for="theme in themes">
                <div class="title">{{ theme.title }}</div>
                <div class="questions-count">{{ theme.questions_count }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { Api } from '../api';
import { useAppStore } from '../stores/app';
import { onUnmounted, ref } from 'vue';

const api = new Api();
const app = useAppStore();
const { fatalError, bottomButtons } = storeToRefs(app);

const data = await api.getThemes();

const themes = ref<Theme[]>([]);

if (data.ok) {
    themes.value = data.response.themes;
} else {
    fatalError.value.message = data.response.description;
}

app.addBottomButton({
    text: "Назад",
    path: "/"
})

onUnmounted(() => {
    bottomButtons.value = [];
})

</script>
<style lang="scss">
@use "../assets/scss/page" as *;
</style>
<style lang="scss" scoped>
.themes {
    .theme {
        display: flex;
        align-items: center;
        
        .title {
            flex: 1;
        }
    }
}
</style>