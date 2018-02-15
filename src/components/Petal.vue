<template>
  <g v-if="isFiltered">
    <path :d="pathData" stroke="black" fill="transparent"/>
    
    <template v-for="(personObject, person, personIndex) of peopleData">
      <StamenFillament :personObject="personObject" :person="person" :index="index" :personIndex="personIndex" :angleSize="angleSize" :halfWidth="halfWidth" :numPeople="numPeople" :angleShift="angleShift" :petalCords="petalCords" :county="county"></StamenFillament>
    </template>

    <template v-for="(songObject, songIndex) of this.obj">
      <StyleFillament :songObject="songObject" :index="index" :songIndex="songIndex" :angleSize="angleSize" :halfWidth="halfWidth" :totalSongs="totalSongs" :angleShift="angleShift" :county="county">
      </StyleFillament>
    </template>

    <template v-for="(songObject, songIndex) of this.obj">
      <Style :songObject="songObject">
      </Style>
    </template>

    <template v-for="(personObject, person, personIndex) of peopleData">
      <Stamen :person="person" :county="county">
      </Stamen>
    </template>

    <circle :cx="xPosition" :cy="yPosition" :r="8" :class="county" v-on:mouseenter="setPetalFilter(true)" v-on:mouseleave="setPetalFilter(false)"></circle>
  </g>
</template>

<script>
import { store } from '../store'
import StamenFillament from './StamenFillament'
import Stamen from './Stamen'
import StyleFillament from './StyleFillament'
import Style from './Style'
export default {
  name: 'Petal',
  store: store,
  components: {
    StamenFillament,
    StyleFillament,
    Stamen,
    Style
  },
  props: ['obj', 'county', 'index', 'angleSize', 'halfWidth', 'angleShift', 'state'],
  methods: {
    getPersonAttributes: function (personName) {
      return this.personAttributes.filter((d) => { return d.name === personName })[0]
    },
    setPetalFilter: function (didEnter) {
      if (didEnter) {
        this.$store.commit('setPetalFilter', {state: this.state, county: this.county})
      } else { this.$store.commit('setPetalFilter', {}) }
    }
  },
  computed: {
    isFiltered: function () {
      let theFilter = this.$store.getters.getPetalFilter
      if (theFilter === {}) { return true }
      if (!(theFilter.state === this.state)) { return true }
      return theFilter.county === this.county
    },
    pathData: function () {
      return `M0 0 C ${this.firstControlPointX} ${this.firstControlPointY}, ${this.secondControlPointX} ${this.secondControlPointY}, ${this.xPosition} ${this.yPosition}`
    },
    firstControlPointX: function () {
      return 1 / 3 * this.xPosition
    },
    firstControlPointY: function () {
      return this.yPosition + 10
    },
    secondControlPointX: function () {
      return 2 / 3 * this.xPosition
    },
    secondControlPointY: function () {
      return this.yPosition + 10
    },
    petalCords: function () {
      return {x: this.xPosition, y: this.yPosition}
    },
    radiusSize: function () {
      return 9
    },
    xPosition: function () {
      return this.halfWidth / 4 * Math.cos(this.angle)
    },
    angle: function () {
      return ((this.index + 0.5) * this.angleSize) + this.angleShift
    },
    yPosition: function () {
      return -this.halfWidth / 4 * Math.sin(this.angle)
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
circle:hover{
  cursor: pointer;
}
</style>