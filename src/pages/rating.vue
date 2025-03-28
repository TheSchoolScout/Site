<template>
    <div class="page">
        <div class="rating">
            <div class="leaders">
                <div class="second">
                    <div class="avatar-container">
                        <img class="avatar" :src="rating[1].avatar">
                    </div>
                    <div class="name">{{ rating[1].name }}</div>
                    <div class="surname">{{ rating[1].surname }}</div>
                    <div class="stars">{{ rating[1].rating }} <Icon class="star" icon="material-symbols:kid-star"/></div>
                </div>
                <div class="first">
                    <div class="avatar-container">
                        <img class="avatar" :src="rating[0].avatar">
                    </div>
                    <div class="name">{{ rating[0].name }}</div>
                    <div class="surname">{{ rating[0].surname }}</div>
                    <div class="stars">{{ rating[0].rating }} <Icon class="star" icon="material-symbols:kid-star"/></div>
                </div>
                <div class="third">
                    <div class="avatar-container">
                        <img class="avatar" :src="rating[2].avatar">
                    </div>
                    <div class="name">{{ rating[2].name }}</div>
                    <div class="surname">{{ rating[2].surname }}</div>
                    <div class="stars">{{ rating[2].rating }} <Icon class="star" icon="material-symbols:kid-star"/></div>
                </div>
            </div>
            <div class="users">
                <div class="user" v-for="(user, i) in users">
                    <img class="avatar" :src="user.avatar">
                    <div class="info">
                        <div class="name">{{ user.name }} {{ user.surname }}</div>
                        <div class="stars">{{ user.rating }} <Icon class="star" icon="material-symbols:kid-star"/></div>
                    </div>
                    <div class="position">#{{ i + 4 }}</div>
                </div>
            </div>
        </div>
        <BottomButton path="/">Назад</BottomButton>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Api } from '../api';
import BottomButton from '../components/UI/BottomButton.vue';
import { Icon } from "@iconify/vue";

const api = new Api();

const rating = ref<User[]>([]);
const data = await api.getRating();

if (data.ok) {
    rating.value = data.response.users;
}

const users = computed(() => {return rating.value.slice(3, rating.value.length)});
</script>
<style lang="scss" scoped>
@use "../assets/scss/page" as *;

.page {
    margin-bottom: 50px;
}

.rating {
    display: flex;
    flex-direction: column;

    .leaders {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;

        .first, .second, .third {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            flex: 1;

            .stars {
                font-size: 0.9rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 4px;
            }
        }

        .first {
            font-size: 1em;
            font-weight: bold;

            .avatar {
                width: 80px;
                height: 80px;
            }

            .avatar-container::after {
                content: "1";
                background-color: #e9c46a;
                color: #866002;
                width: 25px;
                height: 25px;
                font-size: 1.25em;
            }
        }

        .second .avatar-container::after {
            content: "2";
            background-color: #C0C0C0;
            color: #505050;
        }

        .third .avatar-container::after {
            content: "3";
            background-color: #CD7F32;
            color: #f8d7b6;
        }

        .second, .third {
            font-size: 0.9em;

            .avatar {
                width: 60px;
                height: 60px;
            }
        }

        .avatar {
            border-radius: 32%;
            background-color: var(--color-bg-secondary);
            display: block;
        }

        .avatar-container {
            position: relative;

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: 0;
                width: 20px;
                height: 20px;
                border-radius: 32%;
                font-weight: bold;
            }
        }
    }

    .users {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-radius: 8px;
        padding: 8px 12px;
        background-color: var(--color-bg-secondary);

        .user {
            display: flex;
            align-items: center;
            gap: 8px;
            border-radius: 8px;
            background-color: var(--color-bg-secondary);
            cursor: pointer;

            &:hover {
                background-color: var(--color-bg-hover);
            }

            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 32%;
                background-color: var(--color-bg-secondary);
            }

            .info {
                display: flex;
                flex-direction: column;
                flex: 1;

                .name, .surname {
                    font-size: 0.9rem;
                }

                .stars {
                    font-size: 0.8rem;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
            }

            .position {
                font-size: 0.8rem;
                color: var(--color-accent);
                font-weight: bold;
            }
        }
    }

    .star {
        color: var(--color-warn);
    }
}
</style>