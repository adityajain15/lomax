<template>
  <g>
    <path :d="petalPathData" stroke="black" fill="transparent"/>
   <!--
    <template v-for="(songObject, songIndex) of this.obj">
      <Style :songObject="songObject" :index="index" :songIndex="songIndex" :angleSize="angleSize" :halfWidth="halfWidth" :totalSongs="totalSongs" :angleShift="angleShift" :county="county">
      </Style>
    <path v-if="isFirstLayer" :d="pathData"/>
    </template>-->

    <template v-for="(personObject, person, personIndex) of peopleData">
      <path v-if="isFirstLayer(personIndex)" :d="stamenPathData(personIndex)" class="stamenFillament"/>
      <circle :cx="stamenX(personIndex)" :cy="stamenY(personIndex)" :r="stamenRadius" :performer="person" class="person"></circle>
    </template>
    <circle :cx="petalX" :cy="petalY" :r="petalRadius" :id="county"></circle>
  </g>
</template>

<script>

export default {
  name: 'Petal',
  props: ['obj', 'county', 'index', 'angleSize', 'halfWidth', 'angleShift'],
  methods: {
    getPersonAttributes: function (personName) {
      return this.personAttributes.filter((d) => { return d.name === personName })[0]
    },
    stamenLayerPosition: function (personIndex) {
      return (this.stamenArcRadius) + this.stamenLayerIndex(personIndex) * (2 * this.stamenRadius)
    },
    stamenLayerIndex: function (personIndex) {
      return Math.floor(personIndex / this.stamenPerLayer)
    },
    stamenCircleIndex: function (personIndex) {
      if (this.numPeople < this.stamenPerLayer) {
        let indexSkipFactor = (this.stamenPerLayer - this.numPeople) / 2
        return this.index + ((1 / this.stamenPerLayer) * ((personIndex + indexSkipFactor) % this.stamenPerLayer)) + ((1 / this.stamenPerLayer) / 2)
      }
      return this.index + ((1 / this.stamenPerLayer) * (personIndex % this.stamenPerLayer)) + ((1 / this.stamenPerLayer) / 2)
    },
    stamenAngle: function (personIndex) {
      return (this.stamenCircleIndex(personIndex) * this.angleSize) + this.angleShift
    },
    stamenX: function (personIndex) {
      return this.stamenLayerPosition(personIndex) * Math.cos(this.stamenAngle(personIndex))
    },
    stamenY: function (personIndex) {
      return -this.stamenLayerPosition(personIndex) * Math.sin(this.stamenAngle(personIndex))
    },
    isFirstLayer: function (personIndex) {
      return this.stamenLayerIndex(personIndex) === 0
    },
    stamenPathData: function (personIndex) {
      let theLineLength = this.lineLength(personIndex)
      let theStamenAngle = this.stamenAngle(personIndex)

      let stamenFirstCPX = ((this.stamenArcRadius) - (2 / 3 * theLineLength)) * Math.cos(theStamenAngle)
      let stamenFirstCPY = -((this.stamenArcRadius) - (2 / 3 * theLineLength)) * Math.sin(theStamenAngle) - 10
      let stamenSecondCPX = ((this.stamenArcRadius) - (1 / 3 * theLineLength)) * Math.cos(theStamenAngle)
      let stamenSecondCPY = -((this.stamenArcRadius) - (1 / 3 * theLineLength)) * Math.sin(theStamenAngle) - 10
      return `M${this.petalX} ${this.petalY} C ${stamenFirstCPX} ${stamenFirstCPY}, ${stamenSecondCPX} ${stamenSecondCPY}, ${this.stamenX(personIndex)} ${this.stamenY(personIndex)}`
    },
    lineLength: function (personIndex) {
      let angle = this.stamenAngle(personIndex)
      return Math.hypot(((this.stamenArcRadius) * Math.cos(angle)) - this.petalX, (-(this.stamenArcRadius) * Math.sin(angle)) - this.petalY)
    }
  },
  computed: {
    petalPathData: function () {
      return `M0 0 C ${this.firstControlPointX} ${this.firstControlPointY}, ${this.secondControlPointX} ${this.secondControlPointY}, ${this.petalX} ${this.petalY}`
    },
    firstControlPointX: function () {
      return 1 / 3 * this.petalX
    },
    firstControlPointY: function () {
      return this.petalY + 10
    },
    secondControlPointX: function () {
      return 2 / 3 * this.petalX
    },
    secondControlPointY: function () {
      return this.petalY + 10
    },
    petalRadius: function () {
      return 9
    },
    petalX: function () {
      return this.halfWidth / 4 * Math.cos(this.angle)
    },
    petalY: function () {
      return -this.halfWidth / 4 * Math.sin(this.angle)
    },
    angle: function () {
      return ((this.index + 0.5) * this.angleSize) + this.angleShift
    },
    numPeople: function () {
      return Object.keys(this.peopleData).length
    },
    peopleData: function () {
      let people = {}
      let peopleSet = new Set()
      for (let i = 0; i < this.obj.length; i++) {
        for (let j = 0; j < this.obj[i]['Contributor Names'].length; j++) {
          if (!this.obj[i]['Contributor Names'][j].endsWith(' (Collector)') && !peopleSet.has(this.obj[i]['Contributor Names'][j])) {
            peopleSet.add(this.obj[i]['Contributor Names'][j])
            people[this.obj[i]['Contributor Names'][j]] = this.obj[i]
          }
        }
      }
      return people
    },
    totalSongs: function () {
      return this.obj.length
    },
    stamenRadius: function () {
      return 5
    },
    stamenArcSize: function () {
      return this.angleSize * (this.stamenArcRadius)
    },
    stamenArcRadius: function () {
      return this.halfWidth / 2.5
    },
    stamenPerLayer: function () {
      return Math.floor(this.stamenArcSize / (2 * this.stamenRadius))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stamenFillament{
  stroke: black;
  stroke-width: 0.3px;
  fill: transparent;
}
</style>
