<template>
  <CameraView @imageCaptured="addImage" />
  <ImageGallery :images="images" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CameraView from './components/CameraView.vue'
import ImageGallery from './components/ImageGallery.vue'
import axios from 'axios'

export default defineComponent({
  components: {
    CameraView,
    ImageGallery
  },
  setup() {
    const images = ref<string[]>([])

    const getImages = async () => {
      const response = await axios
        .get('https://rgsimplenodeapp.azurewebsites.net/getPictures')
        .then((response) => {
          console.log(response.data)
          return response.data
        })
      return response
    }

    getImages().then((data) => {
      images.value = data
    })

    const addImage = async (imageSrc: any) => {
      const formData = new FormData()
      formData.append('image', imageSrc, 'image.jpg')

      // Send the FormData to the backend
      const response = await fetch('https://rgsimplenodeapp.azurewebsites.net/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        getImages().then((data) => {
          images.value = data
        })
      } else {
        console.error('Image upload failed')
      }
    }

    return { images, addImage }
  }
})
</script>
