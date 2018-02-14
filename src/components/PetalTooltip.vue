<template>
  <div class="petalTooltip" :style="styleObject">
    <h1>{{tooltipData.county}}</h1>
  </div>
</template>

<script>
export default {
  name: 'PetalTooltip',
  data() {
    return {
      styleObject: {
        display: 'none'
      }
    }
  },
  props: ['tooltipData', 'elementWidth'],
  watch: {
    tooltipData: function(newVal, oldVal){
      if(newVal.display){
        this.styleObject['left'] = `${newVal.mouseCords[0]}px`
        this.styleObject['top'] = `${newVal.mouseCords[1]}px`
        this.styleObject['display'] = 'block'
      }
      else{
        this.styleObject['display'] = 'none'
      }
    }
  }
}
</script>
<style scoped>
.petalTooltip{
  width: 20vw;
  height: 15vh;
  background-color: black;
  position: absolute;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 8px;
}
h1{
  font-size: 22px;
  color: white;
}

</style>
