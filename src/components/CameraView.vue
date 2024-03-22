<template>
  <header class="header">MyPhotoGallery</header>
  <div class="camera-container">
    <camera v-if="!isMobile" :resolution="{ width: 375, height: 812 }" ref="camera" autoplay></camera>
    <input v-else type="file" name="image" accept="image/*" capture="user" @change="handleImageInput" ref="fileInput"
      style="display: none" />
    <button v-if="!isMobile" class="round-button toggle-button" @click="toggleCamera"></button>
    <button v-if="!isMobile" class="round-button snapshot-button" @click="snapshot"></button>
    <div class="phone">
      <svg v-if="isMobile" class="camera-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        @click="triggerFileInput" width="70" height="64">
        <path
          d="M20 7h-1.26c-.45-1.45-1.58-2.58-3.03-3.03V2c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1.97C6.84 4.42 5.71 5.55 5.26 7H4c-.55 0-1 .45-1 1v13c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zM12 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
      </svg>
    </div>
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
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    const fileInput = ref<HTMLInputElement | null>(null)

    // Use camera reference to call functions
    const snapshot = async () => {
      const cameraResolution: any = camera.value?.resolution

      const blob: any = await camera.value?.snapshot(
        { width: cameraResolution?.width, height: cameraResolution?.height },
        'image/png',
        0.5
      )
      // const blob: any = await camera.value?.snapshot()

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

    const handleImageInput = (event: any) => {
      const file = event.target.files[0]
      const url = URL.createObjectURL(file)
      emit('imageCaptured', url)
    }

    const triggerFileInput = () => {
      fileInput.value?.click()
    }

    return {
      camera,
      snapshot,
      toggleCamera,
      isMobile,
      handleImageInput,
      triggerFileInput,
      fileInput
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
  bottom: 60px;
}

.toggle-button {
  left: 0%;
  transform: translateX(25%);
  width: 50px;
  height: 50px;
  bottom: 60px;
}

.phone {
  padding-top: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone .camera-icon path {
  fill: white;
  /* Change color to white */
}

.header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
}
</style>
