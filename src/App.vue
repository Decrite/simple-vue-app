<template>
  <CameraView @imageCaptured="addImage" />
  <ImageGallery :images="images" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CameraView from './components/CameraView.vue'
import ImageGallery from './components/ImageGallery.vue'
import axios from 'axios'
type Picture = {
  data: Blob
  id: string
}

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
          console.log('GetImage Reponse Data ' + response.data)
          return response.data.map((imageSrc: Picture) => URL.createObjectURL(imageSrc.data))
        })

      console.log(response)
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
        // Get the image from the response
        const imageBlob = await response.blob()
        const imageUrl = URL.createObjectURL(imageBlob)
        console.log(imageUrl)
        console.log('Image uploaded successfully')
      } else {
        console.error('Image upload failed')
      }
    }

    return { images, addImage }
  }
})
</script>
