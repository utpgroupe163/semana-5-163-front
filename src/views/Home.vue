<template>
  <div class="home generic_background">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <hello-world> </hello-world>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
  .generic_background {
  background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(102,188,223,1) 11%, rgba(207,242,249,1) 100%);
  }
</style>