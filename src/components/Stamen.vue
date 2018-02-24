<template>
  <circle v-if="shouldRender" :style="styleObject" :cx="xPosition" :cy="yPosition" :r="radiusSize" :performer="person" v-on:mouseenter="setStamenFilter(true)" v-on:mouseleave="setStamenFilter(false)">
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
    setStamenFilter: function (didEnter) {
      if (didEnter) {
        this.$store.commit('setStyleFilter', {state: this.state, county: this.county, person: [this.person], id: this.allSongs})
      } else {
        this.$store.commit('setStyleFilter', {})
      }
    }
  },
  created: function () {
    const attributes = this.$store.getters.getPersonData(this.person, this.county)
    if (attributes.includes('Convict')) {
      this.styleObject['fill'] = 'url(#theBrave)'
    } else if (attributes.includes('Black')) {
      this.styleObject['fill'] = '#7fb4ff'
    } else if (attributes.includes('Mexican')) {
      this.styleObject['fill'] = '#ffaf69'
    } else if (attributes.includes('Lomax')) {
      this.styleObject['fill'] = '#fc6a6a'
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
