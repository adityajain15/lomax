<template>
  <div id="styleModal" :style="styleObject">
    <div id="close" v-on:click="closeDisplay">×</div>
    <h1>{{this.$store.getters.modalSongName}}</h1>
    <div id="progress-bar" v-on:click="scrub">
      <div id="progress" :style="this.progressStyle"></div>
      <div id="progressOverlay" v-on:click="scrub"></div>
    </div>
    <button v-on:click="playSong">Play</button>
    <h2>Date of recording</h2>
    <span>{{this.$store.getters.modalDate}}</span>
    <h2>Place of recording</h2>
    <span>{{this.$store.getters.modalPlace}}</span>
    <template v-if="hasGenres">
      <h2>Genres</h2>
      <template v-for="genre of this.$store.getters.modalGenres">
        <span>{{genre}}</span>  
      </template>
    </template>
    <h2>Contributors</h2>
    <template v-for="name of this.$store.getters.modalArtists">
      <span>{{name}}</span>  
    </template>
    <h2>Notes</h2>
    <template v-for="note of this.$store.getters.modalNotes">
      <span>{{note}}</span>  
    </template>
  </div>
</template>

<script>
import { store } from '../store'
import {Howl, Howler} from 'howler'
export default {
  name: 'StyleModal',
  store: store,
  data () {
    return {
      sound: '',
      progressStyle: {
        width: '0%'
      }
    }
  },
  computed: {
    shouldRender: function () {
      return this.$store.getters.getDisplayModal
    },
    hasGenres: function () {
      return !(this.$store.getters.modalGenres.length === 0)
    },
    calculatedWidth: function () {
      return window.innerWidth > 1200 ? 500 : (window.innerWidth * 0.5)
    },
    styleObject: function () {
      return {
        width: `${this.calculatedWidth}px`,
        height: `${window.innerHeight * 0.50}px`,
        display: this.shouldRender ? 'block' : 'none',
        left: `${(window.innerWidth - this.calculatedWidth) / 2}px`
      }
    }
  },
  methods: {
    scrub: function (event) {
      const position = event.offsetX / event.toElement.clientWidth
      const audioPosition = position * this.sound.duration()
      this.sound.seek(audioPosition)
    },
    closeDisplay: function () {
      this.sound.stop()
      this.progressStyle = {width: '0%'}
      this.$store.commit('setDisplayModal', false)
    },
    playSong: function () {
      if (this.sound !== '') {
        this.sound.stop()
        this.progressStyle = {width: '0%'}
      }
      this.sound = new Howl({
        src: [this.$store.getters.modalAudioUrl],
        onload: () => {
          const intervalId = window.setInterval(() => {
            if (!this.sound.playing(songId)) {
              window.clearInterval(intervalId)
              return
            }
            this.progressStyle = {
              width: `${(this.sound.seek() / this.sound.duration()) * 100}%`}
          }, 60)
        }
      })
      const songId = this.sound.play()
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Biryani:400,700,800');

#styleModal{
  position: fixed;
  overflow: scroll;
  top: 25%;
  background-color: rgba(56, 56, 56, 1);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 12px;
}
#close{
  border: 1px solid white;
  border-radius: 30px;
  color: white;
  width: 5%;
  height: 5%;
  margin-left: 92.5%;
  margin-bottom: 5px;
  border-radius: 5px;
}
#close:hover{
  color: black;
  background-color: white;
  cursor: pointer;
}
#progress-bar{
  width: 100%;
  height: 15px;
  padding: 4px;
  border: 1px solid #dadee5;
  box-sizing: border-box;
  position: relative;
}
#progress{
  background: white;
  height: 100%;
}
#progressOverlay{
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  cursor: pointer; 
}
h1{
  font-family: 'Biryani', sans-serif;
  font-weight: 800;
  font-size: 20px;
  color: white;
  margin-bottom: 5px;
}
h2{
  font-family: 'Biryani', sans-serif;
  font-weight: 700;
  font-size: 16px;
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
