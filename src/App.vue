<template>
  <CameraView @imageCaptured="addImage" />
  <ImageGallery :images="images" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CameraView from './components/CameraView.vue';
import ImageGallery from './components/ImageGallery.vue';
import axios from 'axios';

export default defineComponent({
  components: {
    CameraView,
    ImageGallery,
  },
  setup() {
    const images = ref<string[]>([]);

    const updateImages = async () => {
      try {
        const { data } = await axios.get('https://rgsimplenodeapp.azurewebsites.net/getPictures');
        images.value = data;
      } catch (error) {
        console.error('Failed to fetch images', error);
      }
    };

    updateImages();

    const addImage = async (imageSrc: string) => {
      const formData = new FormData();
      formData.append('image', new Blob([imageSrc]), 'image.jpg');

      try {
        const response = await fetch('https://rgsimplenodeapp.azurewebsites.net/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          await updateImages();
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        console.error('Image upload failed', error);
      }
    };

    return { images, addImage };
  },
});
</script>
