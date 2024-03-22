<template>
  <camera :resolution="{ width: 375, height: 812 }" ref="camera" autoplay></camera>
  <button @click="snapshot">Create snapshot</button>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Camera from 'simple-vue-camera'

export default defineComponent({
  emits: ['imageCaptured'],
  setup(props, { emit }) {
    // Get a reference of the component
    const camera = ref<InstanceType<typeof Camera>>()

    // Use camera reference to call functions
    const snapshot = async () => {
      const blob = await camera.value?.snapshot()

      // To show the screenshot with an image tag, create a url
      const url = URL.createObjectURL(blob)
      emit('imageCaptured', url)
      console.log(url)
    }

    return {
      camera,
      snapshot
    }
    const videoElement = ref<HTMLVideoElement | null>(null)
  }
})
</script>
