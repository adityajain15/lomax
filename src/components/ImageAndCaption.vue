<template>
  <div class="imageContainer">
    <div class="lazyLoader">
      <img class="lozad" :data-src="theImage"/>
      <img class="minified" :src="minifiedImage"/>
    </div>
    <caption v-if="this.caption.length!==0">{{this.caption}}</caption>
    <a v-if="this.link.length!==0" :href="this.link" target="blank"><span>From the Library of Congress</span></a>
  </div>
</template>

<script>
import lozad from 'lozad'

export default {
  name: 'ImageAndCaption',
  props: {
    'source': {
      type: String
    },
    'caption': {
      type: String,
      default: ''
    },
    'link': {
      type: String,
      default: ''
    }
  },
  computed: {
    theImage: function () {
      return require(`../../static/Images/${this.source}`)
    },
    minifiedImage: function () {
      return require(`../../static/Resized_Images/${this.source}`)
    }
  },
  mounted: function () {
    const observer = lozad(this.$el.children[0].children[0])
    observer.observe()
  }
}
</script>

<style scoped>
div{
  width: 75%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.lazyLoader{
  margin-bottom: 10px;
  position: relative;
  width: 100%;
}
.minified{
  
}
.lozad{
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
}
img{
  width: 100%;
}
caption{
  display: inline-block;
  font-style: italic;
  font-family: 'Georgia';
  color: white;
}
a{
  font-family: 'Georgia';
  display: block;
  color: deeppink;
}
a:visited{
  color: white;
}
a:hover{
  color: #f47cbc;
}
</style>
