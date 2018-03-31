<template >
  <g>
    <template v-for="(person,personIndex) of songContributors">
      <path :style="shouldRender[person]" :d="allPaths[person]" />
    </template>
  </g>
</template>


<script>
import { store } from '../store'
export default {
  name: 'StyleFillament',
  store: store,
  props: ['songObject', 'index', 'songIndex', 'angleSize', 'halfWidth', 'totalSongs', 'angleShift', 'county', 'state', 'isTexasMobile'],
  methods: {
    calculateFilament: function (personX, personY) {
      let lineLength = Math.hypot((this.arcRadius * Math.cos(this.angle)) - personX, (-this.arcRadius * Math.sin(this.angle)) - personY)
      let firstControlX = (this.arcRadius - (2 / 3 * lineLength)) * Math.cos(this.angle)
      let firstControlY = -(this.arcRadius - (2 / 3 * lineLength)) * Math.sin(this.angle) - 25
      let secondControlX = (this.arcRadius - (1 / 3 * lineLength)) * Math.cos(this.angle)
      let secondControlY = -(this.arcRadius - (1 / 3 * lineLength)) * Math.sin(this.angle) - 25
      return `M${personX} ${personY} C ${firstControlX} ${firstControlY}, ${secondControlX} ${secondControlY}, ${this.xPosition} ${this.yPosition}`
    }
  },
  created: function () {
    this.$store.commit('setStyleCords', {id: this.songObject['Digital Id'], x: this.xPosition, y: this.yPosition})
  },
  watch: {
    cords: function (newVal, oldVal) {
      this.$store.commit('setStyleCords', {id: this.songObject['Digital Id'], ...newVal})
    }
  },
  computed: {
    shouldRender: function () {
      let theFilter = this.$store.getters.getStyleFilter
      let shouldRenderObject = {}
      if (theFilter === {} || !(theFilter.state === this.state)) {
        for (let i = 0; i < this.songContributors.length; i++) {
          shouldRenderObject[this.songContributors[i]] = {display: 'block'}
        }
        return shouldRenderObject
      }
      for (let i = 0; i < this.songContributors.length; i++) {
        if (theFilter.person.includes(this.songContributors[i]) && theFilter.id.includes(this.songObject['Digital Id'])) {
          shouldRenderObject[this.songContributors[i]] = {display: 'block'}
        } else {
          shouldRenderObject[this.songContributors[i]] = {display: 'none'}
        }
      }
      return shouldRenderObject
    },
    radiusSize: function () {
      if (this.isTexasMobile) {
        return 1
      }
      return 4
    },
    arcSize: function () {
      return this.angleSize * this.arcRadius
    },
    arcRadius: function () {
      if (this.isTexasMobile) {
        return this.halfWidth / 1.1
      }
      return this.halfWidth / 1.2
    },
    perLayer: function () {
      return Math.floor(this.arcSize / (2 * this.radiusSize))
    },
    smallCircleIndex: function () {
      if (this.totalSongs < this.perLayer) {
        let indexSkipFactor = (this.perLayer - this.totalSongs) / 2
        return this.index + ((1 / this.perLayer) * ((this.songIndex + indexSkipFactor) % this.perLayer)) + ((1 / this.perLayer) / 2)
      }
      return this.index + ((1 / this.perLayer) * (this.songIndex % this.perLayer)) + ((1 / this.perLayer) / 2)
    },
    angle: function () {
      return (this.smallCircleIndex * this.angleSize) + this.angleShift
    },
    xPosition: function () {
      return this.layerPosition * Math.cos(this.angle)
    },
    yPosition: function () {
      return -this.layerPosition * Math.sin(this.angle)
    },
    cords: function () {
      return {x: this.xPosition, y: this.yPosition}
    },
    layerPosition: function () {
      return this.arcRadius + Math.floor(this.songIndex / this.perLayer) * (2 * this.radiusSize)
    },
    songContributors: function () {
      return this.songObject['Contributor Names'].filter((d) => { return !d.includes('Collector') })
    },
    allPaths: function () {
      let paths = {}
      for (let i = 0; i < this.songContributors.length; i++) {
        let personCords = this.$store.getters.getStamenCords({county: this.county, name: this.songContributors[i]})
        paths[this.songContributors[i]] = this.calculateFilament(personCords.x, personCords.y)
      }
      return paths
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
path{
  stroke: white;
  stroke-width: 0.1px;
  fill: transparent;
}
circle{
  fill:white;
}
</style>
