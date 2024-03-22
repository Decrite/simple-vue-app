<template>
  <div>
    <simple-vue-camera ref="camera"></simple-vue-camera>
    <button @click="captureSnapshot">Capture Snapshot</button>
    <img v-if="snapshot" :src="snapshot" alt="Snapshot" />
  </div>
</template>

<script>
import SimpleVueCamera from 'simple-vue-camera'

export default {
  components: {
    SimpleVueCamera
  },
  data() {
    return {
      snapshot: null
    }
  },
  methods: {
    captureSnapshot() {
      this.$refs.camera
        .capture()
        .then((dataUrl) => {
          this.snapshot = dataUrl
        })
        .catch((error) => {
          console.error('Failed to capture snapshot:', error)
        })
    }
  }
}
</script>

<style scoped>
/* Add your component styles here */
</style>
