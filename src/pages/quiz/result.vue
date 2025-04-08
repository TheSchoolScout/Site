<template>
    <div class="page">
        <div class="question" v-for="question in questions">
            <div class="title">{{ question.metadata.questionText }}</div>
            <SelectBox :question="question"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { Api } from '../../api';
import { ref } from 'vue';
import SelectBox from '../../components/Quiz/SelectBox.vue';

const route = useRoute();
const router = useRouter();

const id = +route.params.id;

if (!id) router.replace("/");

const questions = ref<Question[]>([]);

const api = new Api();
const data = await api.getHistory({ offset: id });

if (!data.ok) {
    console.error(data.response.description);
} else {
    questions.value = data.response.history[0].metadata.questions;
}
</script>
<style lang="scss" scoped>
@use "../../assets/scss/page" as *;

.question {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .title {
        font-size: 1.2rem;
        font-weight: bold;
    }
}
</style>