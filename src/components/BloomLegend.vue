<template>
  <div id="bloomLegend" :style="styleObject">
    <div id="close" v-on:click="closeDisplay()">×</div>
    <h1>How to read the visualization</h1>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       viewBox="0 0 1976 984" enable-background="new 0 0 1976 984" xml:space="preserve">
      <g id="cCMVU7.tif">
        <image overflow="visible" width="1976" height="984" id="Layer_0_1_" xlink:href="static/AA4927A628047286.png" >
        </image>
      </g>
      <path fill="none" d="M473,646c109-272,531-349,581-302"/>
      <rect x="590.4" y="426.4" fill="none" width="225.8" height="32.3"/>
      <text transform="matrix(1 0 0 1 590.3872 450.5767)"><tspan x="0" y="0" fill="#FFFFFF" font-family="'MyriadPro-Regular'" font-size="34px">dasdsadsadas</tspan><tspan x="196.1" y="0" fill="#FFFFFF" font-family="'MyriadPro-Regular'" font-size="34px">-</tspan></text>
    </svg>
    <div id="textWrapper">
      <h2>State</h2>
      <p>John and Ruby Lomax, during their journey in the summer of 1939, visited several states in the American south. The innermost circle in this visualization represents one of the states visited.  
      </p>
      <h2>Counties</h2>
      <p>Each circle at this level represents a county or location logged within the state by the Lomax family. You can hover over the county circles to find out the names of the locations 
      </p>
      <h2>People</h2>
      <p>Each circle at this level represents a person who performed for a sound recording. Special pattern encodings may reveal something about the person
      </p>
      <h2>Songs</h2>
      <p>Each circle at this level represents a song. Click on the songs to play the song or to view more information about it. Color encodes the genre of the song
      </p>
    </div>
  </div>
</template>

<script>
import { store } from '../store'

export default {
  name: 'BloomLegend',
  store: store,
  data () {
    return {
      elementHeight: 500,
      windowWidth: 0,
      windowHeight: 0
    }
  },
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    handleResize: function () {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    closeDisplay: function () {
      console.log('hi')
      this.$store.commit('setDisplayLegend', false)
    }
  },
  computed: {
    songSize: function () {
      return this.elementHeight / 1.1
    },
    songsPath: function () {
      return `m${-this.songSize},0 a${this.songSize},${this.songSize} 0 0 1 ${2 * this.songSize},0`
    },
    personSize: function () {
      return this.elementHeight / 1.7
    },
    personPath: function () {
      return `m${-this.personSize},0 a${this.personSize},${this.personSize} 0 0 1 ${2 * this.personSize},0`
    },
    stateSize: function () {
      return this.elementHeight / 5
    },
    statePath: function () {
      return `m${-this.stateSize},0 a${this.stateSize},${this.stateSize} 0 0 1 ${2 * this.stateSize},0`
    },
    countySize: function () {
      return this.elementHeight / 2.5
    },
    countyPath: function () {
      return `m${-this.countySize},0 a${this.countySize},${this.countySize} 0 0 1 ${2 * this.countySize},0`
    },
    shouldRender: function () {
      return this.$store.getters.getDisplayLegend
      // this.$store.getters.getDisplayModal
    },
    baseTranslate: function () {
      return `translate(${this.elementHeight},${this.elementHeight})`
    },
    calculatedWidth: function () {
      return this.windowWidth > 1200 ? 900 : (this.windowWidth * 0.75)
    },
    halfWidth: function () {
      return this.elementWidth / 2
    },
    styleObject: function () {
      return {
        width: `${this.calculatedWidth}px`,
        height: `${this.windowHeight * 0.80}px`,
        display: this.shouldRender ? 'block' : 'none',
        left: `${(this.windowWidth - this.calculatedWidth) / 2}px`
      }
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Biryani:400,700,800');
svg{
  width: 80%;
}
#bloomLegend{
  position: fixed;
  overflow: scroll;
  top: 10%;
  background-color: rgba(56, 56, 56, 1);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 12px;
  z-index: 5;
}
#close{
  border: 1px solid white;
  border-radius: 30px;
  color: white;
  padding: 5px;
  margin-left: 92.5%;
  margin-bottom: 5px;
  border-radius: 5px;
}
#close:hover{
  color: black;
  background-color: white;
  cursor: pointer;
}
circle{
  fill:#eff3ff;
}
#countyLegend{
  fill:#bdd7e7;
}
#songLegend{
  fill:#2171b5;
}
#personLegend{
  fill:#6baed6;
}
text{
  fill: black;
  font-family: 'Biryani', sans-serif;
  font-weight: 700;
  font-size: 17px;
}
#textWrapper{
  width: 90%;
  line-height: 1.1;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  text-align: left;
  color: white;
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  font-size: 16px;
}
p{
  
}
button{
  margin-bottom: 5px;
  margin-top: 15px;
  color:white;
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgba(56, 56, 56, 1);
  font-family: 'Biryani', sans-serif;
  font-weight: 800;
  text-align: center;
}
button:hover{
  cursor: pointer;
  background-color: white;
  color: rgba(56, 56, 56, 1);
}
h1{
  font-family: 'Biryani', sans-serif;
  font-weight: 800;
  font-size: 32px;
  color: white;
  margin-bottom: 5px;
}
h2{
  font-family: 'Biryani', sans-serif;
  font-weight: 700;
  font-size: 22px;
  text-align: left;
  color: white;
  margin-top: 10px;
  margin-bottom: 5px;
}
span{
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  color: white;
  display: block;
  line-height: 1.1
}
</style>
