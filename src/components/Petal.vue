<template>
  <g v-if="shouldRender">
    <path :d="pathData"/>
    
    <template v-for="(personObject, person, personIndex) of peopleData">
      <StamenFillament :personObject="personObject" :person="person" :index="index" :personIndex="personIndex" :angleSize="angleSize" :halfWidth="halfWidth" :numPeople="numPeople" :angleShift="angleShift" :petalCords="petalCords" :county="county" :state="state"></StamenFillament>
    </template>

    <template v-for="(songObject, songIndex) of this.obj">
      <StyleFillament :songObject="songObject" :index="index" :songIndex="songIndex" :angleSize="angleSize" :halfWidth="halfWidth" :totalSongs="totalSongs" :angleShift="angleShift" :county="county" :state="state">
      </StyleFillament>
    </template>

    <template v-for="(songObject, songIndex) of this.obj">
      <Style :songObject="songObject" :county="county" :state="state">
      </Style>
    </template>

    <template v-for="(personObject, person, personIndex) of peopleData">
      <Stamen :person="person" :personObject="personObject" :county="county" :state="state">
      </Stamen>
    </template>

    <circle :cx="xPosition" :cy="yPosition" :r="8" :class="county" v-on:mouseenter="setPetalFilter(true, $event)" v-on:mouseleave="setPetalFilter(false, $event)"></circle>
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
    setPetalFilter: function (didEnter, event) {
      if (didEnter) {
        let allSongs = this.obj.map(d => { return d['Digital Id'] })
        this.$store.commit('setStyleFilter', {state: this.state, county: this.county, person: Object.keys(this.peopleData), id: allSongs})
        this.$store.commit('setDisplayTooltip', true)
        this.$store.commit('setTooltip', {mouseX: event.clientX, mouseY: event.clientY, text: 'Click circle for more information about this county'})
      } else {
        this.$store.commit('setStyleFilter', {})
        this.$store.commit('setDisplayTooltip', false)
      }
    }
  },
  computed: {
    shouldRender: function () {
      let theFilter = this.$store.getters.getStyleFilter
      if (theFilter === {} || !(theFilter.state === this.state)) { return true }
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
            people[this.obj[i]['Contributor Names'][j]] = [this.obj[i]]
          } else if (!this.obj[i]['Contributor Names'][j].endsWith(' (Collector)') && peopleSet.has(this.obj[i]['Contributor Names'][j])) {
            people[this.obj[i]['Contributor Names'][j]] = [...people[this.obj[i]['Contributor Names'][j]], this.obj[i]]
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
circle{
  fill: url(#RadialGradient1);
}
circle:hover{
  cursor: pointer;
}
path{
  stroke: white; 
  fill: transparent;
}
</style>