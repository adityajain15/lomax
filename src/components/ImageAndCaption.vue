<template>
  <div>
    <img :src="this.source"/>
    <caption>{{this.caption}}</caption><a :href="this.link"><span>From the Library of Congress (Source)</span></a>
  </div>
</template>

<script>

export default {
  name: 'ImageAndCaption',
  props: ['source', 'caption', 'link']
}
</script>

<style scoped>
div{
  width: 75%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
img{
  width: 100%;
}
caption{
  display: inline-block;
  font-style: italic;
  color: black;
}
a{
  color: black;
}
a:visited{
  color: black;
}
a:hover{
  color: deeppink;
}
</style>
