<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainHeader from './components/MainHeader.vue'
const defaultLayout = {
  name: 'DefaultLayout',
  components: {
    MainHeader
  }
}
export default {
  name: 'App',
  components: {
    MainHeader
  },
  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>