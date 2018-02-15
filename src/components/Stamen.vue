<template>
  <circle :cx="xPosition" :cy="yPosition" :r="radiusSize" :performer="person" class="person"></circle>
</template>

<script>
import { store } from '../store'
export default {
  name: 'Stamen',
  store: store,
  props: ['person', 'county'],
  computed: {
    radiusSize: function () {
      return 5
    },
    xPosition: function () {
      return this.$store.getters.getStamenCordX({county: this.county, name: this.person})
    },
    yPosition: function () {
      return this.$store.getters.getStamenCordY({county: this.county, name: this.person})
    }
  }
}
</script>
<style scoped>
path{
  stroke: black;
  stroke-width: 0.3px;
  fill: transparent;
}
circle{
  fill: #f7cae8;
}
circle.beautiful{
  fill: #75a8f9;
}
</style>
