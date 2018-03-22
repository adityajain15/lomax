<template>
  <div class="progressWrapper" v-on:click="playSong">
    <div :style="this.progressBarStyle" class="progressBars"></div>
    <span>{{isPlayingSymbol}}{{this.text}}</span>
  </div>
</template>
<script>
import {Howl} from 'howler'
export default {
  name: 'SoundText',
  props: {
    audioUrl: String,
    text: String,
    shouldRender: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      sound: undefined,
      progressBarStyle: {
        width: '0%'
      }
    }
  },
  beforeDestroy: function () {
    if (this.isDefined) {
      this.sound.stop()
    }
  },
  computed: {
    isDefined: function () {
      return this.sound !== undefined
    },
    isPlayingSymbol: function () {
      if (this.isDefined && this.sound.playing()) {
        return '❙❙ '
      }
      return '► '
    }
  },
  methods: {
    playSong: function () {
      if (!this.isDefined) {
        let fileName = this.audioUrl.slice(this.audioUrl.lastIndexOf('/') + 1)
        this.sound = new Howl({
          src: [`./static/audio_files/${fileName}`],
          onplay: this.progressFunc,
          onend: this.completeProgress
        })
      }
      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
        this.progressFunc()
      }
    },
    completeProgress: function () {
      this.progressBarStyle = {width: '100%'}
    },
    progressFunc: function () {
      const intervalId = window.setInterval(() => {
        if (!this.sound.playing()) {
          window.clearInterval(intervalId)
          return
        }
        this.progressBarStyle = {
          width: `${(this.sound.seek() / this.sound.duration()) * 100}%`}
      }, 60)
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Biryani:400,700,800');
.progressBars{
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: #ffcc00;
}
.progressWrapper:hover{
  cursor: pointer;
}
.progressWrapper{
  display: inline-block;
  position: relative;
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: white;
  
  line-height: 1.2;
  padding: 5px;
  padding-bottom: 1px;
  background: #dbd360;
}
span{
  color: black;
  position: relative;
}
</style>
