<template>
  <div class="camera-container">
    <camera :resolution="{ width: 375, height: 812 }" ref="camera" autoplay></camera>
    <button class="round-button" @click="snapshot"></button>
  </div>
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
      const blob: any = await camera.value?.snapshot()

      // To show the screenshot with an image tag, create a url
      const url: any = URL.createObjectURL(blob)
      emit('imageCaptured', url)
      console.log(url)
    }

    return {
      camera,
      snapshot
    }
  }
})
</script>

<style scoped>
.camera-container {
  position: relative;
}

.round-button {
  position: absolute;
  bottom: 10px; /* Adjust as needed */
  left: 50%; /* Adjust as needed */
  transform: translateX(-50%);
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  border-radius: 50%;
  background-color: #007bff; /* Adjust as needed */
  border: none;
  outline: none;
  cursor: pointer;
}

.round-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px; /* Adjust as needed */
  height: 20px; /* Adjust as needed */
  border-top: 2px solid #fff; /* Adjust as needed */
  border-left: 2px solid #fff; /* Adjust as needed */
  border-radius: 50%;
}
</style>
