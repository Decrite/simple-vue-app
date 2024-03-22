<template>
    <div>
        <video ref="videoElement" autoplay></video>
        <button @click="captureImage">Bild erfassen</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
    emits: ['imageCaptured'],
    setup(props, { emit }) {
        const videoElement = ref<HTMLVideoElement | null>(null);

        onMounted(async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoElement.value) {
                    videoElement.value.srcObject = stream;
                }
            }
        });

        const captureImage = () => {
            if (videoElement.value) {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.value.videoWidth;
                canvas.height = videoElement.value.videoHeight;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);
                    const imageUrl = canvas.toDataURL('image/png');
                    emit('imageCaptured', imageUrl);
                }
            }
        };

        return { videoElement, captureImage };
    },
});
</script>
