<template>
  <div id="app">
    <vue-long-ripple
      @timeup="timeup"
      @mouseup="mouseup"
    ></vue-long-ripple>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    click () {
      console.log('click');
    },
    timeup () {
      console.log('timeup')
    },
    mouseup () {
      console.log('mouseup');
    }
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #eeeeee;
  margin-top: 60px;
  width: 400px;
  height: 400px;
}
</style>
