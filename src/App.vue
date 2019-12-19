<template>
  <div id="app" @click="click">
    <vue-long-ripple :timeup="timeup" :mouseup="mouseup" :longPressTime="0.2"></vue-long-ripple>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    click(){
      console.log('click');
    },
    timeup(){
      console.log('timeup')
    },
    mouseup(){
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
  width: 200px;
  height: 100px;
}
</style>
