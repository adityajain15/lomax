<template>
  <svg :height="SVGHeight" width="95%">
    <template v-for="(songCategory, songCategoryIndex) of sortedSegmentedSongs">
      <text :state="state" :x="margin" :y="margin + 2 * radius + (songCategoryIndex * (radius * 4))">{{songCategory}}</text>
      <template v-for="(song, songIndex) of segmentedSongs[songCategory]">
        <circle :cx="maxTextLength + radius + (songIndex * (2 * radius))" :cy="margin + radius + (songCategoryIndex * (radius * 4))" :r="radius" :fill="getColor(song)" v-on:click="displayModal(song)"></circle>
      </template>
    </template>
  </svg>
</template>

<script>
import {store} from '../store'
import colorMap from '../colorMap'
import {scaleLinear} from 'd3-scale'
import Vue from 'vue'
export default {
  name: 'BarChart',
  store: store,
  props: ['state'],
  data(){
    return {
      'width': 500,
      'margin': 20,
      'maxTextLength': 100
    }
  },
  methods: {
    onResize: function () {
      this.width = this.$el.clientWidth - this.margin - this.maxTextLength
    },
    getColor: function (song) {
      for(let i = 0; i < colorMap.length; i++){
        if(song.Genre.includes(colorMap[i][0])){
          return colorMap[i][1]
        }
      }
    },
    displayModal: function (song) {
      this.$store.commit('setModal', {data: song, type: 'song'})
      this.$store.commit('setDisplayModal', true)
      //this.$store.commit('setDisplayTooltip', false)
    }
  },
  watch: {
    segmentedSongs: function (newVal, oldVal){
      this.$nextTick(function () {
        this.maxTextLength = Math.max(...Array.from(this.$el.getElementsByTagName(`text`)).map(d => {return d.clientWidth}))
        this.onResize()
      })
    }
  },
  computed: {
    segmentedSongs: function (){
      let songs = this.$store.getters.getData(this.state)
      let tempSegmented = {}
      for(let i = 0; i < songs.length; i++){
        for(let j = 0; j < colorMap.length; j++){
          if(songs[i].Genre.includes(colorMap[j][0])){
            if(tempSegmented.hasOwnProperty(colorMap[j][0])){
              tempSegmented[colorMap[j][0]].push(songs[i])
            } else{
              Vue.set(tempSegmented, colorMap[j][0], [songs[i]])
            }
            break
          }
        }
      }
      return tempSegmented
    },
    sortedSegmentedSongs: function () {
      return Object.keys(this.segmentedSongs).sort((a,b) => {
        if(this.segmentedSongs[a].length < this.segmentedSongs[b].length){
          return -1
        } else if(this.segmentedSongs[a].length > this.segmentedSongs[b].length) {
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
      return (this.numCategories * 2 * this.radius * 2) + (2 * this.margin)
    },
    domainMax: function () {
      if(this.segmentedSongs.hasOwnProperty(this.sortedSegmentedSongs[this.sortedSegmentedSongs.length - 1])){
        return this.segmentedSongs[this.sortedSegmentedSongs[this.sortedSegmentedSongs.length - 1]].length
      } else {
        return 0
      }
    },
    radius: function () {
      let computeRadius = (this.width / this.domainMax) / 2
      if(computeRadius > 6) {return 6}

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
</style>
