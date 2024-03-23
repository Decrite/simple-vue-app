<template>
  <div class="image-gallery">
    <ImageItem v-for="(imageSrc, index) in images" :key="index" :imageSrc="imageSrc" :index="index"
      @removeImage="removeImage" @openCarousel="openCarousel" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ImageItem from './ImageItem.vue'
import axios from 'axios'

export default defineComponent({
  components: {
    ImageItem
  },
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  methods: {
    async removeImage(index: number) {
      await axios.delete(`https://rgsimplenodeapp.azurewebsites.net/deletePicture/${index}`)
      this.images.splice(index, 1)
    },

    openCarousel(index: number) { }
  }
})
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.image-item {
  flex: 1 1 calc(50% - 10px);
  position: relative;
}

@media (min-width: 600px) {
  .image-item {
    flex: 1 1 calc(33.333% - 10px);
  }
}

@media (min-width: 900px) {
  .image-item {
    flex: 1 1 calc(25% - 10px);
  }
}
</style>
