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
      let widthFix = this.$el === undefined ? 0 : this.$el.clientWidth
      let topFix = this.$store.getters.tooltipY + 10
      let leftFix = this.$store.getters.tooltipX + 10
      if (window.innerWidth < (leftFix + widthFix)) {
        leftFix = leftFix - widthFix - 20
      }
      if (topFix <= 0) { topFix = 10 }
      if (!this.shouldRender) {
        topFix = 0
        leftFix = 0
      }
      return {
        top: `${topFix}px`,
        left: `${leftFix}px`,
        opacity: this.shouldRender ? 1 : 0
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
  background-color: #141e30;
  border: 1px solid white;
  z-index: 5;
  min-width: 100px;
  max-width: 300px;
}
span{
  font-family: 'Biryani', sans-serif;
  font-weight: 400;
  font-size: 14px;
  text-align: middle;
  color: white;
  display: block;
  line-height: 1.1
}
</style>
