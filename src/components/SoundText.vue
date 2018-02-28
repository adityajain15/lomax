<template>
  <div v-on:click="playSong">
    <div id="progressWrapper">
      <span>{{this.text}}</span>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
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
  data(){
    return {
      sound: undefined
    }
  },
  beforeDestroy: function() {
    if(this.isDefined){
      this.sound.stop()
    }
  },
  computed: {
    isDefined: function () {
      return this.sound !== undefined
    }
  },
  methods: {
    playSong: function () {
      if(this.isDefined) {
        this.sound = new Howl({ src: [this.audioUrl] });
      }

      if(this.sound.playing()){
        this.sound.pause()
      } else{
        this.sound.play()
      }
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Biryani:400,700,800');
div{
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: white;
  text-align: left;
  line-height: 1.2;
}
div:hover{
  cursor: pointer;
}
#progressWrapper{
  display: inline-block;
}
span{
}
</style>
