<template>
  <CameraView @imageCaptured="addImage" />
  <ImageGallery :images="images" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CameraView from './components/CameraView.vue'
import ImageGallery from './components/ImageGallery.vue'
import axios from 'axios';
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
      const response = await axios.get('https://rgsimplenodeapp.azurewebsites.net/getPictures').then((response) => {
        console.log("GetImage Reponse Data " + response.data)
        return response.data.map((imageSrc: Picture) => URL.createObjectURL(imageSrc.data))
      })

      console.log(response)
      return response
    }

    getImages().then((data) => {
      images.value = data
    })

    const addImage = async (imageSrc: Blob) => {
      const response = await axios.post('https://rgsimplenodeapp.azurewebsites.net/setPicture', { data: imageSrc }).then((response) => {
        console.log("AddImage Response Data " + response.data)
        return response.data
      })
      images.value = [...images.value, URL.createObjectURL(response.data)]
    }

    return { images, addImage }
  }
})
</script>
