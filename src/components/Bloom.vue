<template>
  <div class="bloomContainer">
    <h2>{{this.state}}</h2>
    <svg :height="elementHeight" class="bloom" :id="state">
      <defs>
        <pattern id="circlePattern" width="4" height="4"
            patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" style="fill:red"/></rect>
          <circle cx="2" cy="2" r="1.50" style="fill:white"></circle>
        </pattern>
        <pattern id="horizontalLines1" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill='black'/>
          <rect x="0" y="1" width="4" height="2" fill='#ffcc00'/>
        </pattern>
        <pattern id="horizontalLines2" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill='black'/>
          <rect x="0" y="1" width="4" height="1.5" fill='#ffcc00'/>
          <rect x="1" y="0" width="1.5" height="4" fill='#ffcc00'/>
        </pattern>
        <pattern id="horizontalLines3" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill='white'/>
          <rect x="0" y="1" width="4" height="2" fill='#ffaf69'/>
        </pattern>
        <pattern id="horizontalLines4" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill='black'/>
          <rect x="0" y="1" width="4" height="2" fill='#D81159'/>
        </pattern>
        <pattern id="horizontalLines5" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill='#FE9000'/>
          <rect x="0" y="1" width="4" height="2" fill='black'/>
        </pattern>
        <pattern id="horizontalLines6" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill='black'/>
          <rect x="0" y="1" width="4" height="2" fill='#61E786'/>
        </pattern>
        <pattern id="horizontalLines7" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill='gray'/>
          <rect x="0" y="1" width="4" height="2" fill='black'/>
        </pattern>
        <pattern id="horizontalLines8" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" fill='black'/>
          <rect x="0" y="1" width="4" height="1.5" fill='#61E786'/>
          <rect x="1" y="0" width="1.5" height="4" fill='#61E786'/>
        </pattern>
        <radialGradient id="RadialGradient1">
          <stop offset="0%" stop-color="#fccae6"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </radialGradient>
        <radialGradient id="RadialGradient2">
          <stop offset="0%" stop-color="#7fb4ff"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </radialGradient>
        <radialGradient id="RadialGradient3">
          <stop offset="0%" stop-color="#ffaf69"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </radialGradient>
        <radialGradient id="RadialGradient4">
          <stop offset="0%" stop-color="#fc6a6a"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </radialGradient>
      </defs>
      <g :transform="baseTranslate">
        <template v-for="(obj,county,index) of countyData">
          <Petal :obj="obj" :county="county" :index="index" :angleSize="angleSize" :halfWidth="halfWidth" :angleShift="angleShift" :state="state">
          </Petal> 
        </template>
        <circle :cx="0" :cy="0" :r="radiusSize"></circle>
      </g>
    </svg>
  </div>
</template>

<script>
import { store } from '../store'
import Petal from './Petal'
import {TweenMax} from 'gsap'
require('waypoints/lib/noframework.waypoints.js')

export default {
  name: 'Bloom',
  store: store,
  components: {
    Petal
  },
  props: ['data', 'state'],
  data: function () {
    return {
      unfurled: false,
      angleShift: 0,
      elementWidth: 500,
      elementHeight: 500
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    /*const rand = new Waypoint({
      element: this.$el,
      offset: this.elementHeight * 0.50,
      handler: (direction) => {
        if (!this.unfurled && direction === 'down') {
          this.unfurled = true
        }
      }
    })*/
  },
  computed: {
    baseTranslate: function () {
      return `translate(${this.elementWidth / 2},${this.elementHeight})`
    },
    radiusSize: function () {
      return this.halfWidth / 10
    },
    halfWidth: function () {
      return this.elementWidth / 2
    },
    angleSize: function () {
      return Math.PI / Object.keys(this.countyData).length
    },
    countyData: function () {
      let stateArray = this.data.filter((d) => d['Created / Published']['state'] === this.state)
      let countySet = new Set()
      let counties = {}
      stateArray.map((d) => {
        if (!countySet.has(d['Created / Published']['place'])) {
          countySet.add(d['Created / Published']['place'])
          counties[d['Created / Published']['place']] =
            stateArray.filter((each) => {
              return each['Created / Published']['place'] === d['Created / Published']['place']
            })
        }
      })
      return counties
    }
  },
  methods: {
    handleResize: function () {
      this.elementWidth = this.$el.clientWidth
      this.elementHeight = this.halfWidth
    },
    showLegend: function () {
      this.$store.commit('setDisplayLegend', true)
    }
  },
  watch: {
    unfurled: function (newVal, oldVal) {
      if (newVal) {
        let update = function () {
          let tweenedVal = Object.values(tweenedData)
          tweenedVal.pop()
          this.angleShift = tweenedVal[0]
        }
        let tweenedData = {}
        let tweenSourceData = {onUpdate: update, ease: Power1.easeOut, onUpdateScope: this}
        tweenedData[0] = Math.PI
        tweenSourceData[0] = 0
        TweenMax.to(tweenedData, 4, tweenSourceData)
      }
    }
  }
}
</script>

<style scoped>
  svg{
    width: 100%;
  }
  circle{
    fill: url(#RadialGradient1);
  }
  .bloomContainer{
    padding-top: 5px;
    position: relative;
    background: #141e30;
    margin-bottom: 10px;
    margin-top: 10px;
    border: 1px solid white;
  }
  h2{
    font-family: 'Alfa Slab One', cursive;
    font-size: 30px;
    color: deeppink;
  }
</style>
