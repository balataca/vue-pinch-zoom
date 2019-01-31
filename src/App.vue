<template>
  <div id="app">
    <pinch-zoom/>
  </div>
</template>

<script>
import PinchZoom from './components/PinchZoom'

export default {
  name: 'app',
  components: {
    PinchZoom
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
