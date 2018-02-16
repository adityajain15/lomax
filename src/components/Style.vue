<template>
  <circle v-if="shouldRender" :cx="xPosition" :cy="yPosition" :r="radiusSize" class="song" v-on:mouseenter="setStyleFilter(true)" v-on:mouseleave="setStyleFilter(false)"></circle>
</template>

<script>
import { store } from '../store'
export default {
  name: 'Style',
  store: store,
  props: ['songObject', 'county', 'state'],
  methods: {
    setStyleFilter: function (didEnter) {
      if (didEnter) {
        this.$store.commit('setPetalFilter', {state: this.state, county: this.county})
        this.$store.commit('setStamenFilter', {state: this.state, county: this.county, person: this.songContributors})
        this.$store.commit('setStyleFilter', {state: this.state, county: this.county, person: this.songContributors, id: [this.songObject['Digital Id']]})
      } else {
        this.$store.commit('setPetalFilter', {})
        this.$store.commit('setStamenFilter', {})
        this.$store.commit('setStyleFilter', {})
      }
    }
  },
  computed: {
    shouldRender: function () {
      let theFilter = this.$store.getters.getStyleFilter
      if (theFilter === {} || !(theFilter.state === this.state)) { return true }
      return theFilter.id.includes(this.songObject['Digital Id'])
    },
    radiusSize: function () {
      return 3
    },
    xPosition: function () {
      return this.$store.getters.getStyleCordX(this.songObject['Digital Id'])
    },
    yPosition: function () {
      return this.$store.getters.getStyleCordY(this.songObject['Digital Id'])
    },
    songContributors: function () {
      return this.songObject['Contributor Names'].filter((d) => { return !d.includes('Collector') })
    }
  }
}
</script>
<style scoped>
circle{
  fill: white;
}
</style>
