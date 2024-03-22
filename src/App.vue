
<template>
  <CameraView @imageCaptured="addImage" />
  <ImageGallery :images="images" />

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CameraView from './components/CameraView.vue';
import ImageGallery from './components/ImageGallery.vue';

export default defineComponent({
  components: {
    CameraView,
    ImageGallery,
  },
  setup() {
    const images = ref<string[]>([]);

    const addImage = (imageSrc: string) => {
      images.value.push(imageSrc);
    };

    return { images, addImage };
  },
});
</script>
