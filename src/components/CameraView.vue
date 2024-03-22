<template>
  <header class="header">MyPhotoGallery</header>
  <div class="camera-container">
    <camera v-if="!isMobile" ref="camera" autoplay></camera>
    <button v-if="!isMobile" class="round-button snapshot-button" @click="snapshot"></button>
    <button v-if="!isMobile" class="round-button toggle-button" @click="toggleCamera"></button>

    <input
      v-else
      type="file"
      name="image"
      accept="image/*"
      capture="user"
      @change="handleImageInput"
      ref="fileInput"
      style="display: none"
    />
    <div class="phone">
      <svg
        v-if="isMobile"
        class="camera-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        @click="triggerFileInput"
        width="70"
        height="64"
      >
        <path
          d="M20 7h-1.26c-.45-1.45-1.58-2.58-3.03-3.03V2c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1.97C6.84 4.42 5.71 5.55 5.26 7H4c-.55 0-1 .45-1 1v13c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zM12 18c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
        />
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
    const camera = ref<InstanceType<typeof Camera>>()
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    const fileInput = ref<HTMLInputElement | null>(null)

    const snapshot = async () => {
      const cameraResolution: any = camera.value?.resolution

      const blob: any = await camera.value?.snapshot(
        { width: cameraResolution?.width, height: cameraResolution?.height },
        'image/png',
        0.5
      )

      const url: any = URL.createObjectURL(blob)

      emit('imageCaptured', url)
      console.log(url)
    }

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
.round-button {
  position: relative;
  background-color: #ff00c8;
  border: none;
  outline: none;
  cursor: pointer;
}

.snapshot-button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  bottom: 10px;
}

.toggle-button {
  position: absolute;
  left: calc(50% + 50px);
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  bottom: 10px;
}

.phone {
  padding-top: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone .camera-icon path {
  fill: white;
}

.header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
}
</style>
