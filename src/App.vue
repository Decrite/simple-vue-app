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

    To convert the Blob to a base64 string before posting it using Axios, you can use the FileReader API. Here's how you can modify your addImage function:

javascript

const addImage = async (imageSrc) => {
  const reader = new FileReader();

  reader.onload = async () => {
    const base64String = reader.result.split(',')[1];
    console.log(inageSrc)

    const response = await axios.post('https://rgsimplenodeapp.azurewebsites.net/setPicture', { data: base64String });

    console.log("AddImage Response Data ", response.data);

    images.value = [...images.value, response.data];
  };

  reader.readAsDataURL(imageSrc);
};

    return { images, addImage }
  }
})
</script>
