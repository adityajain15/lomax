<template>
  <div id="full-page-container">
    <div id="textWrapper">
      <SouthernStatesSVG id="map" viewBox="0,0,800,400"></SouthernStatesSVG>
      <div id="titleCard">
        <div id="headings">
          <h1>Southern Mosaic</h1>
          <h2><a href="https://twitter.com/whaleandpetunia">By Aditya Jain</a></h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SouthernStatesSVG from '../assets/sm.svg'
export default {
  name: 'FullPageContainer',
  components: {
    SouthernStatesSVG
  }
}
</script>
<style scoped>
#textWrapper{
  padding: 2%;
  box-sizing: border-box;
}
#map{
  width: 50%;
  stroke: black;
}

#titleCard{
  width: 100%;
  height: 50%;
  padding: 2%;
  margin-top: auto;
  margin-bottom: auto;
}
#headings{
  margin-top: auto;
  margin-bottom: auto;
  padding: 2%;
}
h1{
  font-family: 'Alfa Slab One', cursive;
  font-size: 80px;
  color: deeppink;
}
h2{
  font-family: 'Alfa Slab One', cursive;
  font-size: 30px;
  color: deeppink;
}
h2 a{
  color: deeppink;
}
h2 a:hover{
  color: #f47cbc;
}
h2 a:visited{
  color: deeppink;
}
@media (max-width : 800px) {
  #map{
    width: 100%;
    stroke: black;
    margin-bottom: auto;
    margin-top: auto;
  }
  p{
    width: 80%;
    font-size: 14px;
    margin-bottom: 30px;
  }
  h1{
    font-size: 60px;
    line-height: 0.9;
    margin-bottom: 20px;
  }
  h2{
    font-size: 30px;
  }
  #headings{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #titleCard{
    width: 100%;
    height: 50%;
    padding: 2%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
<style>
.hexagonBackground{
  fill: deeppink;
}
.hexagonPatterns{
  animation: pulse 2s infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
}
@keyframes pulse {
  0% {
    fill: #141e30;
  }
  100% {
    fill: white;
  }
}
@keyframes pulseBackground {
  0% {
    fill: #155ed3;
  }
  100% {
    fill: #4da6ff;
  }
}
</style>