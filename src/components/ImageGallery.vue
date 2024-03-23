<template>
  <div class="image-gallery">
    <ImageItem v-for="(imageSrc, index) in images" :key="index" :imageSrc="imageSrc" :index="index"
      @removeImage="removeImage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import ImageItem from './ImageItem.vue';
import axios from 'axios';

export default defineComponent({
  components: { ImageItem },
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  methods: {
    async removeImage(filename: string, index: number) {
      try {
        await axios.delete(`https://rgsimplenodeapp.azurewebsites.net/api/delete/${filename}`);
        this.images.splice(index, 1);
      } catch (error) {
        console.error('Failed to delete image', error);
      }
    },
  },
});
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

@media (min-width: 600px) {
  .image-item {
    flex-basis: calc(33.333% - 10px);
  }
}

@media (min-width: 900px) {
  .image-item {
    flex-basis: calc(25% - 10px);
  }
}
</style>
