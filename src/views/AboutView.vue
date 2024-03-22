<script lang="ts">
export default {
  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isShotPhoto: false,
      isLoading: false,
      link: '#'
    }
  },
  methods: {
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false
        this.isPhotoTaken = false
        this.isShotPhoto = false
        this.stopCameraStream()
      } else {
        this.isCameraOpen = true
        this.createCameraElement()
      }
    },

    createCameraElement(): void {
      this.isLoading = true

      const constraints: MediaStreamConstraints = {
        audio: false,
        video: true
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream: MediaStream) => {
          this.isLoading = false
          if (this.$refs.camera instanceof HTMLVideoElement) {
            this.$refs.camera.srcObject = stream
          }
        })
        .catch((_error: any) => {
          this.isLoading = false
          alert("May the browser didn't support or there is some errors.")
        })
    },

    stopCameraStream(): void {
      if (this.$refs.camera instanceof HTMLVideoElement && this.$refs.camera.srcObject) {
        const tracks: MediaStreamTrack[] = (this.$refs.camera.srcObject as MediaStream).getTracks()

        tracks.forEach((track: MediaStreamTrack) => {
          track.stop()
        })
      }
    },

    takePhoto(): void {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true

        const FLASH_TIMEOUT: number = 50

        setTimeout(() => {
          this.isShotPhoto = false
        }, FLASH_TIMEOUT)

        // Draw the image on the canvas
        const canvas: HTMLCanvasElement | null = this.$refs.canvas as HTMLCanvasElement | null
        const camera: HTMLImageElement | null = this.$refs.camera as HTMLImageElement | null

        if (canvas && camera) {
          const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

          if (context) {
            context.drawImage(camera, 0, 0, 450, 337.5)

            // Get the image data from the canvas
            const imageData: string = canvas.toDataURL('image/jpeg')

            // Save the image data locally (you can modify this part as needed)
            this.savePhotoLocally(imageData)
          }
        }
      }

      this.isPhotoTaken = !this.isPhotoTaken
    },

    displaySavedPhotos(): void {
      const savedPhotos: string[] = this.retrieveSavedPhotos()
      const canvas: HTMLCanvasElement | null = this.$refs.canvas as HTMLCanvasElement | null

      if (canvas) {
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height) // Clear the canvas

          savedPhotos.forEach((photoData: string, index: number) => {
            const img: HTMLImageElement = new Image()
            img.onload = () => {
              if (context) {
                context.drawImage(img, 0, index * 100, 450, 337.5) // Adjust positioning as needed
              }
            }
            img.src = photoData
          })
        }
      }
    },

    downloadImage(): void {
      const download: HTMLAnchorElement | any = document.getElementById('downloadPhoto')
      const canvas: string | null = (document.getElementById('photoTaken') as HTMLCanvasElement)
        .toDataURL('image/jpeg')
        .replace('image/jpeg', 'image/octet-stream')
      if (download && canvas) {
        download.setAttribute('href', canvas)
      }
    },

    retrieveSavedPhotos(): string[] {
      const savedPhotos: string[] = JSON.parse(localStorage.getItem('savedPhotos') || '[]')
      return savedPhotos
    },

    savePhotoLocally(imageData: string): void {
      const savedPhotos: string[] = this.retrieveSavedPhotos()
      savedPhotos.push(imageData)
      localStorage.setItem('savedPhotos', JSON.stringify(savedPhotos))
      console.log('Photo saved locally')
    }
  }
}
</script>

<template>
  <div id="app" class="web-camera-container">
    <div class="camera-button">
      <button
        type="button"
        class="button is-rounded"
        :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }"
        @click="toggleCamera"
      >
        <span v-if="!isCameraOpen">Open Camera</span>
        <span v-else>Close Camera</span>
      </button>
    </div>

    <div v-show="isCameraOpen && isLoading" class="camera-loading">
      <ul class="loader-circle">
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>

    <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box" :class="{ flash: isShotPhoto }">
      <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>

      <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>

      <canvas
        v-show="isPhotoTaken"
        id="photoTaken"
        ref="canvas"
        :width="450"
        :height="337.5"
      ></canvas>
    </div>

    <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
      <button type="button" class="button" @click="takePhoto">
        <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png" />
      </button>
    </div>

    <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
      <a
        id="downloadPhoto"
        download="my-photo.jpg"
        class="button"
        role="button"
        @click="downloadImage"
      >
        Download
      </a>
    </div>
  </div>

  <div v-if="isPhotoTaken && isCameraOpen" class="camera-box" :class="{ flash: isShotPhoto }">
    <canvas
      v-show="isPhotoTaken"
      id="photoTaken"
      ref="canvas"
      :width="450"
      :height="337.5"
    ></canvas>
  </div>
</template>

<style>
body {
  display: flex;
  justify-content: center;
}

.web-camera-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;

  .camera-button {
    margin-bottom: 2rem;
  }

  .camera-box {
    .camera-shutter {
      opacity: 0;
      width: 450px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;

      &.flash {
        opacity: 1;
      }
    }
  }

  .camera-shoot {
    margin: 1rem 0;

    button {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;

      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }

  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;

    ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }

    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;

      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;

        &:nth-child(2) {
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>
