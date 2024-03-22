<template>
  <div class="camera-container">
    <camera :resolution="{ width: 375, height: 812 }" ref="camera" autoplay></camera>
    <button class="round-button toggle-button" @click="toggleCamera"></button>
    <button class="round-button snapshot-button" @click="snapshot"></button>
    <input type="file" name="image" accept="image/*" capture="user" />
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

    // Method to toggle the camera facing mode
    const toggleCamera = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter((device) => device.kind === 'videoinput')
      const currentDeviceId = camera.value?.currentDeviceID()
      const newDevice = videoDevices.find((device) => device.deviceId !== currentDeviceId)
      if (newDevice) {
        await camera.value?.changeCamera(newDevice.deviceId)
      }
    }

    return {
      camera,
      snapshot,
      toggleCamera
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
  bottom: 10px;
  border-radius: 50%;
  background-color: #ff00c8;
  border: none;
  outline: none;
  cursor: pointer;
}

.snapshot-button {
  left: 50%;
  transform: translateX(-75%);
  width: 50px;
  height: 50px;
}

.toggle-button {
  left: 0%;
  transform: translateX(25%);
  width: 50px;
  height: 50px;
}
</style>
