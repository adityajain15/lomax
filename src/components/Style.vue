<template>
  <g>
    <template v-for="(personEmitted,person,personIndex) of filaments">
      <path :d="calculateFilament(personEmitted.x, personEmitted.y)" />
    </template>
    <circle :cx="xPosition" :cy="yPosition" :r="radiusSize"></circle>
  </g>
</template>

<script>
import { EventBus } from './event-bus.js'

export default {
  name: 'Style',
  props: ['songObject', 'index', 'songIndex', 'angleSize', 'halfWidth', 'totalSongs', 'angleShift', 'county'],
  data () {
    return {
      filaments: {}
    }
  },
  created: function () {
    EventBus.$on('cordsChange', resp => {
      if (this.county === resp.county && this.songObject['Contributor Names'].includes(resp.person)) {
        this.filaments[resp.person] = {x: resp.x, y: resp.y}
      }
    })
  },
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
  computed: {
    radiusSize: function () {
      return 3
    },
    arcSize: function () {
      return this.angleSize * this.arcRadius
    },
    arcRadius: function () {
      return this.halfWidth / 1.1
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
    layerPosition: function () {
      return this.arcRadius + Math.floor(this.songIndex / this.perLayer) * (2 * this.radiusSize)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
path{
  stroke: black;
  stroke-width: 0.1px;
  fill: transparent;
}
</style>
