<template>
  <g>
    <path :d="petalPathData" stroke="black" class="petalFillament fillament"/>
    <template v-for="(personObject, person, personIndex) of peopleData">
      <path v-if="isFirstLayer(personIndex)" :d="stamenPathData(personIndex)" class="stamenFillament fillament"/>
    </template>
    <template v-for="(songObject, songIndex) of this.obj">
      <template v-for="(personName, personIndex) of songObject['Contributor Names']">
        <path v-if="notCollector(personName)" :d="stylePathData(personName,songIndex)" class="styleFillament fillament"/>
      </template>
    </template>
    <template v-for="(songObject, songIndex) of this.obj">
      <circle :cx="styleX(songIndex)" :cy="styleY(songIndex)" :r="styleRadius" class="song"></circle>
    </template>
    <template v-for="(personObject, person, personIndex) of peopleData">
      <circle :cx="stamenX(personIndex,person)" :cy="stamenY(personIndex, person)" :r="stamenRadius" :performer="person" :class="getPersonClass(person)"></circle>
    </template>
    <circle :cx="petalX" :cy="petalY" :r="petalRadius" class="petals" :id="county" v-on:mouseover="petalEnter" v-on:mouseleave="petalLeave"></circle>
  </g>
</template>

<script>

export default {
  name: 'Petal',
  props: ['obj', 'county', 'index', 'angleSize', 'halfWidth', 'angleShift'],
  data () {
    return {
      stamenXData: {},
      stamenYData: {}
    }
  },
  methods: {
    getPersonClass: function (person) {
      
    },
    petalEnter: function (mouseEvent) {
      const emitData = {'peopleData': this.peopleData, songs: this.obj, county: this.county, mouseCords: [mouseEvent.layerX, mouseEvent.layerY], display: true}
      this.$emit('petaldataUpdate', emitData)
    },
    petalLeave: function (mouseEvent) {
      const emitData = {mouseCords: [mouseEvent.layerX, mouseEvent.layerY], display: false, county: this.county, 'peopleData': this.peopleData, songs: this.obj}
      this.$emit('petaldataUpdate', emitData)
    },
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
    stamenX: function (personIndex, person) {
      let xPosition = this.stamenLayerPosition(personIndex) * Math.cos(this.stamenAngle(personIndex))
      this.stamenXData[person] = xPosition
      return xPosition
    },
    stamenY: function (personIndex, person) {
      let yPosition = -this.stamenLayerPosition(personIndex) * Math.sin(this.stamenAngle(personIndex))
      this.stamenYData[person] = yPosition
      return yPosition
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
    },
    styleCircleIndex: function (songIndex) {
      if (this.totalSongs < this.stylePerLayer) {
        let indexSkipFactor = (this.stylePerLayer - this.totalSongs) / 2
        return this.index + ((1 / this.stylePerLayer) * ((songIndex + indexSkipFactor) % this.stylePerLayer)) + ((1 / this.stylePerLayer) / 2)
      }
      return this.index + ((1 / this.stylePerLayer) * (songIndex % this.stylePerLayer)) + ((1 / this.stylePerLayer) / 2)
    },
    styleAngle: function (songIndex) {
      return (this.styleCircleIndex(songIndex) * this.angleSize) + this.angleShift
    },
    styleX: function (songIndex) {
      return this.styleLayerPosition(songIndex) * Math.cos(this.styleAngle(songIndex))
    },
    styleY: function (songIndex) {
      return -this.styleLayerPosition(songIndex) * Math.sin(this.styleAngle(songIndex))
    },
    styleLayerPosition: function (songIndex) {
      return this.styleArcRadius + Math.floor(songIndex / this.stylePerLayer) * (2 * this.styleRadius)
    },
    stylePathData: function (personName, songIndex) {
      let personX = this.stamenXData[personName]
      let personY = this.stamenYData[personName]
      let styleX = this.styleX(songIndex)
      let styleY = this.styleY(songIndex)
      let styleAngle = this.styleAngle(songIndex)
      let lineLength = Math.hypot((this.styleArcRadius * Math.cos(styleAngle)) - personX, (-this.styleArcRadius * Math.sin(styleAngle)) - personY)
      let firstControlX = (this.styleArcRadius - (2 / 3 * lineLength)) * Math.cos(styleAngle)
      let firstControlY = -(this.styleArcRadius - (2 / 3 * lineLength)) * Math.sin(styleAngle) - 25
      let secondControlX = (this.styleArcRadius - (1 / 3 * lineLength)) * Math.cos(styleAngle)
      let secondControlY = -(this.styleArcRadius - (1 / 3 * lineLength)) * Math.sin(styleAngle) - 25
      return `M${personX} ${personY} C ${firstControlX} ${firstControlY}, ${secondControlX} ${secondControlY}, ${styleX} ${styleY}`
    },
    notCollector: function (personName) {
      return !personName.includes('Collector')
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
      return 6
    },
    stamenArcSize: function () {
      return this.angleSize * (this.stamenArcRadius)
    },
    stamenArcRadius: function () {
      return this.halfWidth / 2.5
    },
    stamenPerLayer: function () {
      return Math.floor(this.stamenArcSize / (2 * this.stamenRadius))
    },
    styleRadius: function () {
      return 4
    },
    styleArcSize: function () {
      return this.angleSize * this.styleArcRadius
    },
    styleArcRadius: function () {
      return this.halfWidth / 1.2
    },
    stylePerLayer: function () {
      return Math.floor(this.styleArcSize / (2 * this.styleRadius))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.petalFillament{
  stroke: 0.5px;
}
.stamenFillament{
  stroke-width: 0.3px;
}
.styleFillament{
  stroke-width: 0.1px;
}
.fillament{
  fill: transparent;
  stroke: white;
}
circle:hover{
  cursor: pointer;
}
circle{
  fill: url(#RadialGradient1);
  stroke: blue;
  stroke-opacity: 0;
}
.petals{
  stroke-width: 4px;
}
.song{
  stroke-width: 1px;
}
.person{
  stroke-width: 2px;
}
.black{
  fill: url(#RadialGradient2);
}
</style>
