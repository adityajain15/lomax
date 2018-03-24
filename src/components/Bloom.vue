<template>
  <div class="bloomContainer">
    <h2>{{this.state}}</h2>
    <svg :height="elementHeight" class="bloom" :id="state">
      <defs>
        <pattern id="theBrave" width="5" height="5"
            patternUnits="userSpaceOnUse" style="background:white">
          <rect x="0" y="0" width="5" height="5" style="fill:#7fb4ff"/></rect>
          <circle cx="2.5" cy="2.5" r="2" style="fill:#1557c1"></circle>
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
      angleShift: Math.PI,
      elementWidth: 500,
      elementHeight: 500
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    const unfurlWaypoint = new Waypoint({
      element: this.$el,
      offset: this.elementHeight / 2,
      handler: (direction) => {
        if (!this.unfurled && direction === 'down') {
          this.unfurled = true
        }
      }
    })
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
  }
  h2{
    font-family: 'Alfa Slab One', cursive;
    font-size: 30px;
    color: deeppink;
  }
</style>
