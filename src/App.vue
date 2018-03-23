<template>
  <div id="app">
    <FullPageContainer></FullPageContainer>
    <p>On March 31 1939, when John and Ruby Lomax left their vacation home on San José Island, Texas, they already had some idea of what they would encounter on their three-month, 6,502 mile journey through the southern United States collecting folk songs</p>
    <p>Many of the people and places they planned to visit were already familiar to them, and while they were always on the alert for previously unrecorded musical genres, songs and tunes, one of the purposes of this trip was to record some of their favorite folk songs and folk singers from past expeditions on state-of-the-art equipment. The Library of Congress provided the Lomaxes with the latest in recording technology: a portable Presto disc-cutting machine, with extra batteries and a supply of blank 12-inch acetate discs and sapphire needles that could be replenished upon request. Hauling this heavy equipment to and from the trunk of their Plymouth as they stopped to make recordings in schools, churches, homes, hotels, prisons and even along the roadside in locales throughout the rural South, they could hardly have suspected that, in 60 years' time, the cultural heritage they were collecting for deposit in the Archive of American Folk Song at the Library of Congress would be played back, with the click of a mouse button, through computer speakers in homes, schools and offices around the world, at the Library's Web Site.
    </p>
    <ImageAndCaption source="00343r.jpg" caption='Stavin Chain playing guitar and singing the ballad "Batson" accompanied by a musician playing violin, Lafayette, La.' link="https://www.loc.gov/item/2007660400/"></ImageAndCaption>
    <ImageAndCaption source="00276r.jpg" caption='Stavin Chain playing guitar and singing the ballad "Batson" accompanied by a musician playing violin, Lafayette, La.' link="https://www.loc.gov/item/2007660400/"></ImageAndCaption>
    <ImageAndCaption source="38809r.jpg" caption='Stavin Chain playing guitar and singing the ballad "Batson" accompanied by a musician playing violin, Lafayette, La.' link="https://www.loc.gov/item/2007660400/"></ImageAndCaption>
    <MapContainer></MapContainer>
    <Tooltip></Tooltip>
    <StyleModal></StyleModal>
    <BloomLegend></BloomLegend>
    <BarChart state="Texas"></BarChart>
    <Bloom :data="theData" state="Texas"></Bloom>
    <BarChart state="Louisiana"></BarChart>
    <Bloom :data="theData" state="Louisiana"></Bloom>
    <BarChart state="Arkansas"></BarChart>
    <Bloom :data="theData" state="Arkansas"></Bloom>
    <BarChart state="Mississippi"></BarChart>
    <Bloom :data="theData" state="Mississippi"></Bloom>
    <BarChart state="Alabama"></BarChart>
    <Bloom :data="theData" state="Alabama"></Bloom>
    <BarChart state="Florida"></BarChart>
    <Bloom :data="theData" state="Florida"></Bloom>
    <BarChart state="Georgia"></BarChart>
    <Bloom :data="theData" state="Georgia"></Bloom>
    <BarChart state="South Carolina"></BarChart>
    <Bloom :data="theData" state="South Carolina"></Bloom>
    
    
    
  </div>
</template>

<script>
import { store } from './store'
import MapContainer from './components/MapContainer'
import FullPageContainer from './components/FullPageContainer'
import Tooltip from './components/Tooltip'
import StyleModal from './components/StyleModal'
import BloomLegend from './components/BloomLegend'
import Bloom from './components/Bloom'
import BarChart from './components/BarChart'
import ImageAndCaption from './components/ImageAndCaption'
import {json as getJSON} from 'd3-request'
import dataFile from '../static/data.json'
import peopleFile from '../static/people.json'

export default {
  name: 'app',
  store: store,
  components: {
    MapContainer,
    FullPageContainer,
    BarChart,
    Bloom,
    Tooltip,
    StyleModal,
    BloomLegend,
    ImageAndCaption
  },
  data () {
    return {
      theData: []
    }
  },
  created: function () {
    getJSON(dataFile, (resp) => {
      this.$store.commit('setData', resp)
      this.theData = resp
    })
    getJSON(peopleFile, (resp) => {
      this.$store.commit('setPeopleData', resp)
    })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Alfa+Slab+One|Roboto');

#app {
  font-family: 'Alfa Slab One', cursive;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

p{
  font-family: 'Georgia';
  background-color: white;
  padding: 10px;
  font-size: 18px;
  line-height: 1.2;
  width: 50%;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  color: black;
  text-align: left;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 750px) {
  p{
    width: 85%;
  }
}

</style>
