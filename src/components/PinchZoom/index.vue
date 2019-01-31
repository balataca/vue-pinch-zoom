<template>
  <div class="wrapper">
    <div class="target" v-pinch></div>
    <button @click="clearLog">Clear Log</button>
    <ul id="log" ref="log"></ul>
  </div>
</template>

<script>
import pinchDirective from './pinch-zoom'

export default {
  name: 'PinchZoom',
  directives: {
    pinch: pinchDirective
  },
  methods: {
    clearLog () {
      this.$refs.log.innerHTML = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.target {
  touch-action: none;
  background: white;
  height: 200px;
  border: 1px solid black;
}

.log {
  width: 200px;
  height: 200px;
}
</style>
