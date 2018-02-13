<template>
  <div id="app">
    <Bloom :data="theData" :people="people" state="Mississippi"></Bloom>
    <Bloom :data="theData" :people="people" state="Texas"></Bloom>
    <Bloom :data="theData" :people="people" state="Alabama"></Bloom>
    <Bloom :data="theData" :people="people" state="Arkansas"></Bloom>
    <Bloom :data="theData" :people="people" state="South Carolina"></Bloom>
    <Bloom :data="theData" :people="people" state="Louisiana"></Bloom>
    <Bloom :data="theData" :people="people" state="Florida"></Bloom>
    <Bloom :data="theData" :people="people" state="Georgia"></Bloom>
  </div>
</template>

<script>
import Bloom from './components/Bloom'
import {json as getJSON} from 'd3-request'

export default {
  name: 'app',
  components: {
    Bloom
  },
  data () {
    return {
      theData: [],
      people: []
    }
  },
  created: function () {
    getJSON('/static/data.json', (resp) => {
      this.theData = resp
    })
    getJSON('/static/people.json', (resp) => {
      this.people = resp
    })
  }
}
</script>

<style scoped>
#mapContainer{
  position: relative;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
