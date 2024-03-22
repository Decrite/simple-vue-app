<template>
    <div class="image-item">
        <img :src="imageSrc" :alt="'Captured Image'" class="captured-image" />
        <button @click="emitRemove">Löschen</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, emits } from 'vue';

export default defineComponent({
    props: {
        imageSrc: {
            type: String as PropType<string>,
            required: true,
        },
        index: {
            type: Number as PropType<number>,
            required: true,
        },
    },
    emits: ['removeImage'],
    setup(props, { emit }) {
        const emitRemove = () => {
            emit('removeImage', props.index);
        };
        return { emitRemove };
    },
});
</script>

<style scoped>
.image-item {
    position: relative;
    flex: 1 1 auto;
    max-width: calc(50% - 10px);
    /* Behält die ursprüngliche Styling-Logik bei */
}

.captured-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    /* Ändert zu 'contain', um das Bildformat zu bewahren */
}

button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
}
</style>