<template>
  <g>
    <path v-if="isFirstLayer" :d="pathData"/>
    <circle :cx="xPosition" :cy="yPosition" :r="radiusSize" :performer="person" class="person"></circle>
  </g>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  name: 'Stigma',
  props: ['personObject', 'person', 'index', 'personIndex', 'angleSize', 'halfWidth', 'numPeople', 'angleShift', 'petalCords', 'county'],
  watch: {/*
    xPosition: function () {
      EventBus.$emit('cordsChange', {x: this.xPosition, y: this.yPosition, person: this.person, county: this.county})
    }*/
  },
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
    layerPosition: function () {
      return (this.arcRadius) + this.layerIndex * (2 * this.radiusSize)
    },
    layerIndex: function () {
      return Math.floor(this.personIndex / this.perLayer)
    },
    isFirstLayer: function () {
      return this.layerIndex === 0
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
