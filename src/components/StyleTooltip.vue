<template>
  <div id="styleTooltip" :style="styleObject">
    <h1>{{this.$store.getters.styleTooltipSongName}}</h1>
    <h2>Date of recording</h2>
    <span>{{this.$store.getters.styleTooltipDate}}</span>
    <h2>Place of recording</h2>
    <span>{{this.$store.getters.styleTooltipPlace}}</span>
    <h2>Contributors</h2>
    <template v-for="name of this.$store.getters.styleTooltipArtists">
      <span>{{name}}</span>  
    </template>
  </div>
</template>

<script>
import { store } from '../store'
export default {
  name: 'StyleTooltip',
  store: store,
  computed: {
    shouldRender: function () {
      return this.$store.getters.displayStyleTooltip
    },
    styleObject: function () {
      let widthFix = 400
      let topFix = this.$store.getters.styleTooltipY
      let leftFix = this.$store.getters.styleTooltipX + 10
      if (window.innerWidth < (leftFix + widthFix)) { leftFix = leftFix - widthFix - 20 }
      if (topFix <= 0) { topFix = 10 }
      return {
        top: `${topFix}px`,
        left: `${leftFix}px`,
        width: `${widthFix}px`,
        display: this.shouldRender ? 'block' : 'none'
      }
    }
  }

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Biryani:400,700,800');

div{
  position: fixed;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 12px;
  background-color: rgba(56, 56, 56, 0.3);
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
