<template>
  <div class="image-gallery">
    <div class="image-container" v-for="(imageSrc, index) in images" :key="index">
      <img :src="imageSrc" :alt="`Captured Image ${index}`" class="captured-image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
})
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}

.image-container {
  flex: 1 1 auto;
  max-width: calc(50% - 10px);
  /* Anpassung für zweispaltiges Layout auf kleineren Bildschirmen */
}

.captured-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

@media (min-width: 600px) {
  .image-container {
    max-width: calc(33.333% - 10px);
    /* Anpassung für dreispaltiges Layout auf mittleren Bildschirmen */
  }
}

@media (min-width: 900px) {
  .image-container {
    max-width: calc(25% - 10px);
    /* Anpassung für vierspaltiges Layout auf größeren Bildschirmen */
  }
}
</style>
