<template>

  <div class="camera-container">
    <CameraView @imageCaptured="addImage" />
  </div>
  <div class="gallery-container">
    <ImageGallery :images="images" />
  </div>

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
<style>
/* Gesamtes Layout */
.camera-container,
.gallery-container {
  height: 100vh;
  /* Stellt sicher, dass beide Container die volle Höhe des Viewports einnehmen */
}

.camera-container {
  float: left;
  width: 100vb;
  height: 100vh;
  overflow: hidden;
}

.gallery-container {
  float: right;
  width: 100vb;
  height: 100vh;
  overflow-y: auto;
}

@media (max-width: 768px) {

  .camera-container,
  .gallery-container {
    width: 100%;
    height: 50vh;
    float: none;
  }

  .gallery-container {
    overflow-y: auto;
  }
}
</style>
