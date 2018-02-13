<template>
  <svg :height="elementHeight" class="bloom" :id="state">
    <g :transform="baseTranslate">
      <circle :cx="0" :cy="0" :r="radiusSize"></circle>
      <template v-for="(obj,county,index) of countyData">
        <Petal :obj="obj" :county="county" :index="index" :angleSize="angleSize" :halfWidth="halfWidth" :angleShift="angleShift">
        </Petal> 
      </template>
    </g>
  </svg>
</template>

<script>
import Petal from './Petal'
import {TweenMax} from 'gsap'
require('waypoints/lib/noframework.waypoints.js')

export default {
  name: 'Bloom',
  components: {
    Petal
  },
  props: ['data', 'people', 'state'],
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
      return this.halfWidth / 6
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
    getPeopleData: function (county) {
      return this.people.filter((d) => { return d.county === county })
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
        let tweenSourceData = {onUpdate: update, ease: Back.easeOut, onUpdateScope: this}
        tweenedData[0] = Math.PI
        tweenSourceData[0] = 0
        TweenMax.to(tweenedData, 5, tweenSourceData)
      }
    }
  }
}
</script>

<style scoped>
  svg{
    width: 100%;
  }
</style>
