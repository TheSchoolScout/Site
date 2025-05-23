<template>
    <div class="tasks">
        <div class="item" :class="{disabled: !me?.is_daily_available}" @click="selectTask('daily')">
            <div class="icon">
                <img src="../../assets/img/tasks/daily.png" height="36px" width="36px"/>
            </div>
            <div class="text">Задача дня</div>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="arrow"/>
        </div>
        <div class="item" @click="selectTask('random')">
            <div class="icon">
                <img src="../../assets/img/tasks/random.png" height="36px" width="36px"/>
            </div>
            <div class="text">Случайные вопросы</div>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="arrow"/>
        </div>
        <div class="item" @click="selectTask('random-theme')">
            <div class="icon">
                <img src="../../assets/img/tasks/random-themed.png" height="36px" width="36px"/>
            </div>
            <div class="text">Случайные вопросы по теме</div>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="arrow"/>
        </div>
        <div class="item" @click="selectTask('random-themed')">
            <div class="icon">
                <img src="../../assets/img/tasks/random-theme.png" height="36px" width="36px"/>
            </div>
            <div class="text">Случайные вопросы по случайной теме</div>
            <Icon icon="material-symbols:arrow-forward-ios-rounded" class="arrow"/>
        </div>

        <QuestionCountPicker v-if="showQuestionCountPicker" @close="showQuestionCountPicker = false" @pick="onQuestionCountPicked"/>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

import { Api } from '../../api';
import { useAppStore } from '../../stores/app';
import { storeToRefs } from 'pinia';
import QuestionCountPicker from './QuestionCountPicker.vue';
const api = new Api();

const app = useAppStore();
const { me } = storeToRefs(app);

const router = useRouter();

const showQuestionCountPicker = ref(false);
const questionCount = ref(0);
const selectedTask = ref<Task | null>(null);

function onQuestionCountPicked(count: number) {
    questionCount.value = count;
    startTask(selectedTask.value!);
}

type Task = 'daily' | 'random' | 'random-themed' | 'random-theme';


async function selectTask(task: Task){
    if (task == 'daily') {
        await startTask(task);
    } else {
        showQuestionCountPicker.value = true;
        selectedTask.value = task;
    }
}

async function startTask(task: Task) {
    try {
        switch (task) {
            case 'daily':
                if (!me.value?.is_daily_available) return;
                
                const daily = await api.dailyQuiz();
                if(!daily.ok) throw new Error("Failed to fetch daily quiz");

                router.replace("/quiz/page");           
                break;
            case 'random':
                const random = await api.randomQuiz({count: +questionCount.value});
                if(!random.ok) throw new Error("Failed to fetch random quiz");

                router.replace("/quiz/page");
                break;
            case 'random-theme':
                break;
            case 'random-themed':
                const randomTheme = await api.randomQuizTheme({count: +questionCount.value});
                if(!randomTheme.ok) throw new Error("Failed to fetch random theme quiz");

                router.replace("/quiz/page");
                break;
        }
    } catch (error) {
        console.error(error);
    }
}
</script>
<style lang="scss" scoped>
@use "../../assets/scss/mixins" as *;

.tasks {
    overflow: hidden;

    .item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        gap: 8px;
        cursor: pointer;

        &:not(:last-child){
            border-bottom: 1.5px solid var(--color-border);
        }

        &.disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        &:not(.disabled){
            @include ripple;
        }

        .icon {
            width: 36px;
            height: 36px;
        }

        .text {
            flex: 1;
        }

        .arrow {
            color: var(--color-hint);
        }
    }
}
</style>