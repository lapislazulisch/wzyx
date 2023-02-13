<template>
  <div class="home">
    <h1>文字游戏</h1>
    <router-link style="text-align: center;" to="/puzzle0">作者信息</router-link>
    <br>
    <router-link to="/content_01">序章</router-link>
    <br>
    <router-link to="/puzzle0">第一关</router-link>
    <br>
    <router-link to="/puzzle0">第二关</router-link>
    <br>
    <router-link to="/puzzle0">第三关</router-link>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">

</style>
