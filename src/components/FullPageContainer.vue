<template>
  <div class="full-page-container">
    <SouthernStatesSVG id="map" viewBox="0,0,800,400"></SouthernStatesSVG>
    <h1>Southern Mosaic</h1>
  </div>
</template>

<script>
import { store } from '../store'
import SouthernStatesSVG from '../assets/sm.svg'
export default {
  name: 'FullPageContainer',
  store: store,
  components: {
    SouthernStatesSVG
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Biryani:400,700,800');
.full-page-container{
  width: 100vw;
  height: 100vh;
  padding: 2%;
  box-sizing: border-box;
  background: #ffcc00;
}
#map{
  width: 100%;
  stroke: white;
}
h1{
  font-size: 96px;
  color: white;
  font-weight: 800;
}
</style>
