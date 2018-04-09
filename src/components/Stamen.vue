<template>
  <circle :style="styleObject" :cx="xPosition" :cy="yPosition" :r="radiusSize" :performer="person" v-on:mouseenter="setStamenFilter($event)" v-on:mouseleave="$emit('resetFilter')" v-on:click="displayModal()">
  </circle>
</template>

<script>
import { store } from '../store'
export default {
  name: 'Stamen',
  store: store,
  props: ['person', 'personObject', 'county', 'state', 'isTexasMobile', 'filter'],
  methods: {
    displayModal: function () {
      this.$store.commit('setModal', {data: this.personObject, name: this.person, county: this.county, state: this.state, type: 'person'})
      this.$store.commit('setDisplayModal', true)
      this.$store.commit('setDisplayTooltip', false)
    },
    setStamenFilter: function (event) {
      let newFilter = {county: this.county, person: [this.person], id: this.allSongs}
      this.$emit('filterChange', newFilter)

      this.$store.commit('setDisplayTooltip', true)
      this.$store.commit('setTooltip', {mouseX: event.clientX, mouseY: event.clientY, text: `${this.person}. Click circle for more information`})
    }
  },
  computed: {
    radiusSize: function () {
      if (this.isTexasMobile) {
        return 2
      }
      return 4
    },
    xPosition: function () {
      return this.$store.getters.getStamenCordX({county: this.county, name: this.person})
    },
    yPosition: function () {
      return this.$store.getters.getStamenCordY({county: this.county, name: this.person})
    },
    shouldRender: function () {
      if (Object.keys(this.filter).length === 0) { return true }
      return this.filter.person.includes(this.person)
    },
    allSongs: function () {
      return this.personObject.map((d) => { return d['Digital Id'] })
    },
    styleObject: function () {
      let temp = {}
      const attributes = this.$store.getters.getPersonData(this.person, this.county)
      temp['display'] = this.shouldRender ? 'block' : 'none'
      if (attributes.includes('Convict')) {
        if (attributes.includes('White')) {
          temp['fill'] = 'url(#horizontalLines8)'
        } else {
          temp['fill'] = 'url(#horizontalLines2)'
        }
      } else if (attributes.includes('Negro')) {
        temp['fill'] = 'url(#horizontalLines1)'
      } else if (attributes.includes('Mexican')) {
        temp['fill'] = 'url(#horizontalLines5)'
      } else if (attributes.includes('Lomax')) {
        temp['fill'] = 'url(#horizontalLines4)'
      } else if (attributes.includes('White')) {
        temp['fill'] = 'url(#horizontalLines6)'
      } else {
        temp['fill'] = '#96999e'
      }
      return temp
    }
  }
}
</script>
<style scoped>
circle{
  fill: #fccae6;
}
circle:hover{
  stroke: white;
  stroke-width: 1px;
}
</style>
