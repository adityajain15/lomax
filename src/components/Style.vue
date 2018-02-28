<template>
  <circle v-if="shouldRender" :cx="xPosition" :cy="yPosition" :style="styleObject" :r="radiusSize" class="song" v-on:click="displayModal()" v-on:mouseenter="setStyleFilter(true, $event)" v-on:mouseleave="setStyleFilter(false, $event)"></circle>
</template>

<script>

import { store } from '../store'
export default {
  name: 'Style',
  store: store,
  props: ['songObject', 'county', 'state'],
  data: function () {
    return {
      styleObject: {}
    }
  },
  methods: {
    displayModal: function () {
      this.$store.commit('setModal', {data: this.songObject, type: 'song'})
      this.$store.commit('setDisplayModal', true)
      this.$store.commit('setDisplayTooltip', false)
    },
    setStyleFilter: function (didEnter, event) {
      if (didEnter) {
        this.$store.commit('setDisplayTooltip', true)
        this.$store.commit('setTooltip', {mouseX: event.clientX, mouseY: event.clientY, text: 'Click circle to hear the recording or to see more information such as the genre'})
        this.$store.commit('setStyleFilter', {state: this.state, county: this.county, person: this.songContributors, id: [this.songObject['Digital Id']]})
      } else {
        this.$store.commit('setDisplayTooltip', false)
        this.$store.commit('setStyleFilter', {})
      }
    }
  },
  computed: {
    shouldRender: function () {
      let theFilter = this.$store.getters.getStyleFilter
      if (theFilter === {} || !(theFilter.state === this.state)) { return true }
      return theFilter.id.includes(this.songObject['Digital Id'])
    },
    radiusSize: function () {
      return 4
    },
    xPosition: function () {
      return this.$store.getters.getStyleCordX(this.songObject['Digital Id'])
    },
    yPosition: function () {
      return this.$store.getters.getStyleCordY(this.songObject['Digital Id'])
    },
    songContributors: function () {
      return this.songObject['Contributor Names'].filter((d) => { return !d.includes('Collector') })
    }
  },
  created: function () {
    const genres = this.songObject.Genre
    if (genres.includes('Hunting calls')) {
      this.styleObject['fill'] = '#a6cee3'
    } else if (genres.includes('Disaster ballads')) {
      this.styleObject['fill'] = '#1f78b4'
    } else if (genres.includes('Bawdy songs')) {
      this.styleObject['fill'] = '#FF1654'
    } else if (genres.includes('War songs')) {
      this.styleObject['fill'] = '#33a02c'
    } else if (genres.includes('Schottisches')) {
      this.styleObject['fill'] = '#fb9a99'
    } else if (genres.includes('Drinking songs')) {
      this.styleObject['fill'] = '#e31a1c'
    } else if (genres.includes('Marches')) {
      this.styleObject['fill'] = '#fdbf6f'
    } else if (genres.includes('Animal calls')) {
      this.styleObject['fill'] = '#ff7f00'
    } else if (genres.includes('Humorous recitations')) {
      this.styleObject['fill'] = '#cab2d6'
    } else if (genres.includes('Courting songs')) {
      this.styleObject['fill'] = '#dd3497'  //6a3d9a
    } else if (genres.includes('Tall tales')) {
      this.styleObject['fill'] = '#ffff99'
    } else if (genres.includes('Waltzes')) {
      this.styleObject['fill'] = '#b15928'
    } else if (genres.includes('Counting songs')) {
      this.styleObject['fill'] = '#a6d854'//8dd3c7
    } else if (genres.includes('Love songs')) {
      this.styleObject['fill'] = '#f768a1'  //ffffb3
    } else if (genres.includes('Hunting songs')) {
      this.styleObject['fill'] = '#bebada'
    } else if (genres.includes('Prayers')) {
      this.styleObject['fill'] = '#cb181d'
    } else if (genres.includes('Narratives')) {
      this.styleObject['fill'] = '#ffcc00'
    } else if (genres.includes('Folk drama')) {
      this.styleObject['fill'] = '#bf812d'
    } else if (genres.includes('Religious drama')) {
      this.styleObject['fill'] = '#fb6a4a'
    } else if (genres.includes('Hymns')) {
      this.styleObject['fill'] = '#99000d' //FFDD4A
    } else if (genres.includes('Humorous songs')) {
      this.styleObject['fill'] = '#FE9000'
    } else if (genres.includes('Announcements')) {
      this.styleObject['fill'] = '#ffffbf'
    } else if (genres.includes('Field hollers')) {
      this.styleObject['fill'] = '#44CFCB'
    } else if (genres.includes('Nursery rhymes')) {
      this.styleObject['fill'] = '#41ab5d' //C1666B
    } else if (genres.includes('Cowboy songs')) {
      this.styleObject['fill'] = '#D4B483'
    } else if (genres.includes('Corridos')) {
      this.styleObject['fill'] = '#f6e8c3'
    } else if (genres.includes('Fiddle tunes')) {
      this.styleObject['fill'] = '#a50f15'
    } else if (genres.includes('Lullabies')) {
      this.styleObject['fill'] = '#b2df8a'
    } else if (genres.includes('Spoken word')) {
      this.styleObject['fill'] = '#ffff99'//F3FFBD
    } else if (genres.includes('Dance music')) {
      this.styleObject['fill'] = '#FCAB64'
    } else if (genres.includes('Ballads')) {
      this.styleObject['fill'] = '#dfc27d'
    } else if (genres.includes('Work songs')) {
      this.styleObject['fill'] = '#01A7C2'
    } else if (genres.includes('Children\'s songs')) {
      this.styleObject['fill'] = '#61E786'
    } else if (genres.includes('Religious songs')) {
      this.styleObject['fill'] = '#D81159'
    }
  }
}
</script>
<style scoped>
circle{
  fill: white;
}
circle:hover{
  stroke: white;
  stroke-width: 1px;
}
</style>
