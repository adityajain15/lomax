<template>
  <path :d="pathData"/>
</template>

<script>
import { store } from '../store'
export default {
  name: 'StamenFillament',
  store: store,
  props: ['personObject', 'person', 'index', 'personIndex', 'angleSize', 'halfWidth', 'numPeople', 'angleShift', 'petalCords', 'county'],
  computed: {
    pathData: function () {
      return `M${this.petalCords.x} ${this.petalCords.y} C ${this.firstControlPointX} ${this.firstControlPointY}, ${this.secondControlPointX} ${this.secondControlPointY}, ${this.xPosition} ${this.yPosition}`
    },
    lineLength: function () {
      return Math.hypot(((this.arcRadius) * Math.cos(this.angle)) - this.petalCords.x, (-(this.arcRadius) * Math.sin(this.angle)) - this.petalCords.y)
    },
    firstControlPointX: function () {
      return ((this.arcRadius) - (2 / 3 * this.lineLength)) * Math.cos(this.angle)
    },
    firstControlPointY: function () {
      return -((this.arcRadius) - (2 / 3 * this.lineLength)) * Math.sin(this.angle) - 10
    },
    secondControlPointX: function () {
      return ((this.arcRadius) - (1 / 3 * this.lineLength)) * Math.cos(this.angle)
    },
    secondControlPointY: function () {
      return -((this.arcRadius) - (1 / 3 * this.lineLength)) * Math.sin(this.angle) - 10
    },
    radiusSize: function () {
      return 5
    },
    arcSize: function () {
      return this.angleSize * (this.arcRadius)
    },
    arcRadius: function () {
      return this.halfWidth / 2.5
    },
    perLayer: function () {
      return Math.floor(this.arcSize / (2 * this.radiusSize))
    },
    smallCircleIndex: function () {
      if (this.numPeople < this.perLayer) {
        let indexSkipFactor = (this.perLayer - this.numPeople) / 2
        return this.index + ((1 / this.perLayer) * ((this.personIndex + indexSkipFactor) % this.perLayer)) + ((1 / this.perLayer) / 2)
      }
      return this.index + ((1 / this.perLayer) * (this.personIndex % this.perLayer)) + ((1 / this.perLayer) / 2)
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
    cordinates: function () {
      return {x: this.xPosition, y: this.yPosition}
    },
    layerPosition: function () {
      return (this.arcRadius) + this.layerIndex * (2 * this.radiusSize)
    },
    layerIndex: function () {
      return Math.floor(this.personIndex / this.perLayer)
    }
  },
  created: function () {
    this.$store.commit('setStamenCords', {county: this.county, name: this.person, ...this.cordinates})
  },
  watch: {
    cordinates: function (newVal, oldVal) {
      this.$store.commit('setStamenCords', {county: this.county, name: this.person, ...newVal})
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
</style>
