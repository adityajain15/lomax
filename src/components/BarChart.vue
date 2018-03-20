<template>
  <svg :height="SVGHeight" width="95%">
    <text :x="clientWidth / 2" :y="margin" text-anchor="middle">Genre breakdown of songs from {{state}}</text>
    <text :x="clientWidth / 2" :y="margin + textHeight" text-anchor="middle">Click circles for more information</text>
    <template v-for="(songCategory, songCategoryIndex) of sortedSegmentedSongs">
      <text class="barChartLabel" :state="state" :x="margin" :y="margin + (2 * textHeight) + (2 * textHeight * songCategoryIndex)">{{songCategory}}</text>
      <template v-for="(song, songIndex) of segmentedSongs[songCategory]">
        <circle :cx="margin + radius + (songIndex * (2 * radius))" :cy="margin + (3 * textHeight) + (2 * textHeight * songCategoryIndex) - radius" :r="radius" :fill="getColor(song)" v-on:mouseover="setTooltip(song, $event)" v-on:mouseleave="removeTooltip" v-on:click="displayModal(song)"></circle>
      </template>
    </template>
  </svg>
</template>

<script>
import {store} from '../store'
import colorMap from '../colorMap'
import Vue from 'vue'
export default {
  name: 'BarChart',
  store: store,
  props: ['state'],
  data () {
    return {
      'chartWidth': 500,
      'clientWidth': 500,
      'marginTop': 30,
      'margin': 20,
      'padding': 10,
      'textHeight': 22
    }
  },
  methods: {
    onResize: function () {
      this.chartWidth = this.$el.clientWidth - (2 * this.margin)
      this.clientWidth = this.$el.clientWidth
    },
    getColor: function (song) {
      for (let i = 0; i < colorMap.length; i++) {
        if (song.Genre.includes(colorMap[i][0])) {
          return colorMap[i][1]
        }
      }
    },
    displayModal: function (song) {
      this.$store.commit('setModal', {data: song, type: 'song'})
      this.$store.commit('setDisplayModal', true)
      //this.$store.commit('setDisplayTooltip', false)
    },
    setTooltip: function (song, event) {
      this.$store.commit('setDisplayTooltip', true)
      this.$store.commit('setTooltip', {mouseX: event.clientX, mouseY: event.clientY, text: song.Title})
    },
    removeTooltip: function () {
      this.$store.commit('setDisplayTooltip', false)
    }
  },
  computed: {
    segmentedSongs: function () {
      let songs = this.$store.getters.getData(this.state)
      let tempSegmented = {}
      for (let i = 0; i < songs.length; i++) {
        for (let j = 0; j < colorMap.length; j++) {
          if (songs[i].Genre.includes(colorMap[j][0])) {
            if (tempSegmented.hasOwnProperty(colorMap[j][0])) {
              tempSegmented[colorMap[j][0]].push(songs[i])
            } else {
              Vue.set(tempSegmented, colorMap[j][0], [songs[i]])
            }
            break
          }
        }
      }
      return tempSegmented
    },
    sortedSegmentedSongs: function () {
      return Object.keys(this.segmentedSongs).sort((a, b) => {
        if (this.segmentedSongs[a].length < this.segmentedSongs[b].length) {
          return -1
        } else if (this.segmentedSongs[a].length > this.segmentedSongs[b].length) {
          return 1
        } else {
          return 0
        }
      })
    },
    numCategories: function () {
      return this.sortedSegmentedSongs.length
    },
    SVGHeight: function () {
      // this math is possibly wrong
      return ((this.numCategories) * 2 * this.textHeight) + (2 * this.margin) + (this.textHeight)
    },
    domainMax: function () {
      if (this.segmentedSongs.hasOwnProperty(this.sortedSegmentedSongs[this.sortedSegmentedSongs.length - 1])) {
        return this.segmentedSongs[this.sortedSegmentedSongs[this.sortedSegmentedSongs.length - 1]].length
      } else {
        return 0
      }
    },
    radius: function () {
      let computeRadius = (this.chartWidth / this.domainMax) / 2
      if (computeRadius > 6) { return 6 }
      return computeRadius
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }
}
</script>

<style scoped>
svg{
  background: black;
  max-width: 1000px;
}
circle:hover{
  cursor: pointer;
}
text{
  font-family: 'Alfa Slab One', cursive;
  fill: deeppink;
}

.barChartLabel{
  fill: white;
}
</style>
