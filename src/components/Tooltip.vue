<template>
  <div id="tooltip" :style="styleObject">
    <span>{{this.$store.getters.tooltipText}}</span>
  </div>
</template>

<script>
import { store } from '../store'
export default {
  name: 'Tooltip',
  store: store,
  computed: {
    shouldRender: function () {
      return this.$store.getters.getDisplayTooltip
    },
    styleObject: function () {
      let widthFix = 400
      let topFix = this.$store.getters.tooltipY
      let leftFix = this.$store.getters.tooltipX + 10
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
  z-index: 5;
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
