<template>
    <div class="image-item" @mouseover="hover = true" @mouseleave="hover = false">
        <img :src='"https://istEgal.azurewebsites.net/uploads/" + imageSrc' alt="Captured Image"
            class="captured-image" />
        <div class="overlay" v-if="hover">
            <button @click="emitRemove">🗑️</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        imageSrc: String,
        index: Number,
    },
    emits: ['removeImage'],
    setup(props, { emit }) {
        const hover = ref(false);

        const emitRemove = () => emit('removeImage', props.imageSrc, props.index);

        return { hover, emitRemove };
    },
});
</script>

<style scoped>
.image-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(50% - 10px);
    height: 150px;
    overflow: hidden;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

button {
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: white;
    font-size: 24px;
}

.captured-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}
</style>
