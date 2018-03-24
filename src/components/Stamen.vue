<template>
  <circle v-if="shouldRender" :style="styleObject" :cx="xPosition" :cy="yPosition" :r="radiusSize" :performer="person" v-on:mouseenter="setStamenFilter(true, $event)" v-on:mouseleave="setStamenFilter(false, $event)" v-on:click="displayModal()">
  </circle>
</template>

<script>
import { store } from '../store'
export default {
  name: 'Stamen',
  store: store,
  data () {
    return {
      styleObject: {}
    }
  },
  props: ['person', 'personObject', 'county', 'state'],
  methods: {
    displayModal: function () {
      this.$store.commit('setModal', {data: this.personObject, name: this.person, county: this.county, state: this.state, type: 'person'})
      this.$store.commit('setDisplayModal', true)
      this.$store.commit('setDisplayTooltip', false)
    },
    setStamenFilter: function (didEnter) {
      if (didEnter) {
        this.$store.commit('setStyleFilter', {state: this.state, county: this.county, person: [this.person], id: this.allSongs})
        this.$store.commit('setDisplayTooltip', true)
        this.$store.commit('setTooltip', {mouseX: event.clientX, mouseY: event.clientY, text: `${this.person}. Click circle for more information`})
      } else {
        this.$store.commit('setStyleFilter', {})
        this.$store.commit('setDisplayTooltip', false)
      }
    }
  },
  created: function () {
    const attributes = this.$store.getters.getPersonData(this.person, this.county)
    if (attributes.includes('Convict')) {
      this.styleObject['fill'] = 'url(#horizontalLines2)'
    } else if (attributes.includes('Black')) {
      this.styleObject['fill'] = 'url(#horizontalLines1)'
    } else if (attributes.includes('Mexican')) {
      this.styleObject['fill'] = 'url(#horizontalLines5)'
    } else if (attributes.includes('Lomax')) {
      this.styleObject['fill'] = 'url(#horizontalLines4)'
    }
  },
  computed: {
    radiusSize: function () {
      return 4
    },
    xPosition: function () {
      return this.$store.getters.getStamenCordX({county: this.county, name: this.person})
    },
    yPosition: function () {
      return this.$store.getters.getStamenCordY({county: this.county, name: this.person})
    },
    shouldRender: function () {
      let theFilter = this.$store.getters.getStyleFilter
      if (theFilter === {} || !(theFilter.state === this.state)) { return true }
      return theFilter.person.includes(this.person)
    },
    allSongs: function () {
      return this.personObject.map((d) => { return d['Digital Id'] })
    }
  }
}
</script>
<style scoped>
circle{
  fill: #fccae6;
}
</style>
