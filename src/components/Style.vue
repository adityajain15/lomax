<template>
  <circle :cx="xPosition" :cy="yPosition" :r="radiusSize" class="song"></circle>
</template>

<script>
import { store } from '../store'
export default {
  name: 'Style',
  store: store,
  props: ['songObject'],
  computed: {
    radiusSize: function () {
      return 3
    },
    xPosition: function () {
      return this.$store.getters.getStyleCordX(this.songObject['Digital Id'])
    },
    yPosition: function () {
      return this.$store.getters.getStyleCordY(this.songObject['Digital Id'])
    }
  }
}
</script>
<style scoped>
circle{
  fill: white;
}
</style>
