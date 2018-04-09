<template>
  <circle :cx="xPosition" :cy="yPosition" :style="styleObject" :r="radiusSize" class="song" v-on:click="displayModal()" v-on:mouseenter="setStyleFilter($event)" v-on:mouseleave="$emit('resetFilter')"></circle>
</template>

<script>

import { store } from '../store'
import colorMap from '../colorMap'
export default {
  name: 'Style',
  store: store,
  props: ['songObject', 'county', 'state', 'isTexasMobile', 'filter'],
  methods: {
    displayModal: function () {
      this.$store.commit('setModal', {data: this.songObject, type: 'song'})
      this.$store.commit('setDisplayModal', true)
      this.$store.commit('setDisplayTooltip', false)
    },
    setStyleFilter: function (event) {
      this.$store.commit('setDisplayTooltip', true)
      this.$store.commit('setTooltip', {mouseX: event.clientX, mouseY: event.clientY, text: `${this.songObject.Title}. Click for more information`})

      const newFilter = {county: this.county, person: this.songContributors, id: [this.songObject['Digital Id']]}
      this.$emit('filterChange', newFilter)
    }
  },
  computed: {
    shouldRender: function () {
      if (Object.keys(this.filter).length === 0) { return true }
      return this.filter.id.includes(this.songObject['Digital Id'])
    },
    styleObject: function () {
      let theColor = 'white'
      for (let i = 0; i < colorMap.length; i++) {
        if (this.songObject.Genre.includes(colorMap[i][0])) {
          theColor = colorMap[i][1]
          break
        }
      }
      return {
        'fill': theColor,
        'display': this.shouldRender ? 'block' : 'none'
      }
    },
    radiusSize: function () {
      if (this.isTexasMobile) {
        return 1
      }
      return 4
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
circle:hover{
  stroke: white;
  stroke-width: 1px;
}
</style>
