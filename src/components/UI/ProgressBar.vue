<template>
    <progress
        :style="{'--color': props.color, '--thickness': props.thickness}"
        class="material-progress-bar"
    ></progress>
</template>
<script lang="ts" setup>
const props = defineProps(["color", "thickness"]);
</script>
<style>
.material-progress-bar {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    box-sizing: border-box;
    border: none;
    border-radius: 50%;
    padding: var(--thickness, 0.25em);
    width: 3em;
    height: 3em;
    color: var(--color, var(--color-accent));
    background-color: transparent;
    font-size: 16px;
    overflow: hidden;
}

.material-progress-bar::-webkit-progress-bar {
    background-color: transparent;
}

/* Indeterminate */
.material-progress-bar:indeterminate {
    -webkit-mask-image: linear-gradient(transparent 50%, black 50%),
        linear-gradient(to right, transparent 50%, black 50%);
    mask-image: linear-gradient(transparent 50%, black 50%),
        linear-gradient(to right, transparent 50%, black 50%);
    animation: material-progress-bar 6s infinite cubic-bezier(0.3, 0.6, 1, 1);
}

:-ms-lang(x),
.material-progress-bar:indeterminate {
    animation: none;
}

.material-progress-bar:indeterminate::before,
.material-progress-bar:indeterminate::-webkit-progress-value {
    content: "";
    display: block;
    box-sizing: border-box;
    margin-bottom: var(--thickness, 0.25em);
    border: solid var(--thickness, 0.25em) transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    width: 100% !important;
    height: 100%;
    background-color: transparent;
    animation: material-progress-bar-pseudo 0.75s infinite linear alternate;
}

.material-progress-bar:indeterminate::-moz-progress-bar {
    box-sizing: border-box;
    border: solid var(--thickness, 0.25em) transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-color: transparent;
    animation: material-progress-bar-pseudo 0.75s infinite linear alternate;
}

.material-progress-bar:indeterminate::-ms-fill {
    animation-name: -ms-ring;
}

@keyframes material-progress-bar {
    0% {
        transform: rotate(0deg);
    }
    12.5% {
        transform: rotate(180deg);
        animation-timing-function: linear;
    }
    25% {
        transform: rotate(630deg);
    }
    37.5% {
        transform: rotate(810deg);
        animation-timing-function: linear;
    }
    50% {
        transform: rotate(1260deg);
    }
    62.5% {
        transform: rotate(1440deg);
        animation-timing-function: linear;
    }
    75% {
        transform: rotate(1890deg);
    }
    87.5% {
        transform: rotate(2070deg);
        animation-timing-function: linear;
    }
    100% {
        transform: rotate(2520deg);
    }
}

@keyframes material-progress-bar-pseudo {
    0% {
        transform: rotate(-30deg);
    }
    29.4% {
        border-left-color: transparent;
    }
    29.41% {
        border-left-color: currentColor;
    }
    64.7% {
        border-bottom-color: transparent;
    }
    64.71% {
        border-bottom-color: currentColor;
    }
    100% {
        border-left-color: currentColor;
        border-bottom-color: currentColor;
        transform: rotate(225deg);
    }
}
</style>