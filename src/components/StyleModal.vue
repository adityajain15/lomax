<template>
  <div id="styleModal" :style="styleObject">
    <div id="close" v-on:click="closeDisplay">×</div>
    
    <template v-if="this.$store.getters.modalIsSong">
      <h1>{{this.$store.getters.modalSongName}}</h1>
      <div class="textWrapper">
        <div id="progress-bar" v-on:click="scrub">
          <div id="progress" :style="this.progressStyle"></div>
          <div id="progressOverlay" v-on:click="scrub"></div>
        </div>
        <button v-on:click="playSong">{{buttonString()}} song</button>
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

    <template v-if="this.$store.getters.modalIsPerson">
      <h1>{{this.$store.getters.modalPerson}}</h1>
      <div class="textWrapper">
        <h2>Place of performance</h2>
        <span>{{this.$store.getters.modalPOP}}</span>
        <h2>Additional Information</h2>
        <span>{{this.$store.getters.getPersonData(this.$store.getters.modalPerson, this.$store.getters.modalPersonCounty)}}</span>
        <h2>Songs</h2>
        <template v-for="song of this.$store.getters.modalPersonSongs">
          <div class="sound-text-wrapper">
            <SoundText :audioUrl="song.audioUrl" :text="song.Title" :shouldRender="shouldRender"></SoundText>
          </div>
          <h3>Genres</h3>
          <template v-for="genre of song.Genre">
            <template v-if="genre !== 'Music' && genre!== 'Songs'">
              <span>{{genre}}</span>
            </template>
          </template>
          
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { store } from '../store'
import {Howl} from 'howler'
import SoundText from './SoundText'
export default {
  name: 'StyleModal',
  store: store,
  components: {
    SoundText
  },
  data () {
    return {
      sound: '',
      progressStyle: {
        width: '0%'
      },
      songId: 0,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    }
  },
  computed: {
    shouldRender: function () {
      return this.$store.getters.getDisplayModal
    },
    hasGenres: function () {
      return !(this.$store.getters.modalGenres.length === 0)
    },
    styleObject: function () {
      return {
        width: `${this.innerWidth > 1000 ? 500 : this.innerWidth * 0.75}px`,
        height: `${this.innerHeight * 0.50}px`,
        display: this.shouldRender ? 'block' : 'none',
        top: `${this.innerHeight * 0.25}px`,
        left: `${this.innerWidth > 1000 ? (this.innerWidth - 500) / 2 : this.innerWidth * 0.125}px`
      }
    },
    audioUrl: function () {
      return this.$store.getters.modalAudioUrl
    }
  },
  watch: {
    audioUrl: function (newVal, oldVal) {
      if (this.sound !== '') {
        this.sound.stop()
        this.sound = ''
      }

      this.progressStyle = {width: '0%'}
      this.sound = new Howl({
        src: [this.$store.getters.modalAudioUrl],
        onload: this.progressFunc
      })
    }
  },
  mounted: function () {
    window.onresize = this.handleResize
  },
  methods: {
    scrub: function (event) {
      const position = event.offsetX / event.toElement.clientWidth
      const audioPosition = position * this.sound.duration()
      this.sound.seek(audioPosition)
      this.progressStyle = {
        width: `${(this.sound.seek() / this.sound.duration()) * 100}%`}
    },
    closeDisplay: function () {
      this.$store.commit('setDisplayModal', false)
    },
    buttonString: function () {
      if (this.sound !== '' && this.sound.playing(this.songId)) {
        return 'Pause'
      }
      return 'Play'
    },
    progressFunc: function () {
      const intervalId = window.setInterval(() => {
        if (this.sound === '' || !this.sound.playing(this.songId)) {
          window.clearInterval(intervalId)
          return
        }
        this.progressStyle = {
          width: `${(this.sound.seek() / this.sound.duration()) * 100}%`}
      }, 60)
    },
    playSong: function () {
      // song source is same but not playing
      if (!this.sound.playing()) {
        this.songId = this.sound.play()
        this.progressFunc()
        return
      }
      this.sound.pause()
    },
    handleResize: function () {
      this.innerWidth = window.innerWidth
      this.innerHeight = window.innerHeight
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Biryani:400,700,800');

#styleModal{
  position: fixed;
  overflow: scroll;
  background-color: #141e30;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 12px;
  z-index: 5;
}
.textWrapper{
  width: 80%;
  margin-right: auto;
  margin-left: auto;
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
button{
  margin-bottom: 5px;
  margin-top: 15px;
  color:white;
  border: 1px solid white;
  border-radius: 5px;
  background-color: rgba(56, 56, 56, 1);
  font-family: 'Alfa Slab One', cursive;
  text-align: center;
}
button:hover{
  cursor: pointer;
  background-color: white;
  color: rgba(56, 56, 56, 1);
}
.textButton {
  display: block;
}
.sound-text-wrapper{
  text-align: left;
}
h1{
  font-family: 'Alfa Slab One', cursive;
  font-size: 22px;
  color: deeppink;
  margin-bottom: 5px;
}
h2{
  font-family: 'Alfa Slab One', cursive;
  font-size: 16px;
  text-align: left;
  color: deeppink;
  margin-top: 10px;
  margin-bottom: 5px;
}
h3{
  font-family: 'Alfa Slab One', cursive;
  font-size: 14px;
  color: white;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: left;
  text-decoration: underline;
}
span{
  font-family: Georgia;
  font-size: 15px;
  text-align: left;
  color: white;
  display: block;
  line-height: 1.1
}
</style>
