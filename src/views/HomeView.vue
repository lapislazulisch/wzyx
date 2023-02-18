<template>
  <div class="home">
    <nav id="nav">
      <ul v-if="m === 0" class="menu1">
        <li class="text maintitle" @click="mainTitle()">主菜单</li><li>|</li>
        <li class="text beforepuzzle" @click="backCheckPoint()">上一关</li><li>|</li>
        <li class="text nextpuzzle" @click="updataCheckPoint()">下一关</li><li>|</li>
        <li class="text retry" @click="retry()">重新开始</li><li>|</li>
        <li class="text choose" @click="toMenu2()">选关</li>
      </ul>
      <ul v-if="m === 1" class="menu2">
        <li class="text back" @click="toMenu1()">返回</li><li>|</li>
        <li class="text prologue">序章</li><li>|</li>
        <li class="text puzzleone">第一关</li><li>|</li>
        <li class="text puzzletwo">第二关</li>
      </ul>
    </nav>
    <div class="title" v-if="this.$store.state.checkPoint === -1">文 字 游 戏</div>
    <!-- <router-link style="text-align: center;" to="/puzzle_01" v-if="this.checkPoint === ''">作者信息</router-link>
    <br> -->
    <div class="item" v-if="this.$store.state.checkPoint === -1" @click="open0()">开始游戏</div>
    <div id="empty0"></div>
    <div class="item" v-if="this.$store.state.checkPoint === -1" @click="open0()">选择关卡</div>
    <div id="empty1"></div>
    <div class="item" v-if="this.$store.state.checkPoint === -1" @click="editor()">作者信息</div>
    <div v-if="this.$store.state.checkPoint === 666"></div>
    <div v-if="this.$store.state.checkPoint === 0"><content_01/></div>
    <div v-if="this.$store.state.checkPoint === 1"><screen_start_01/></div>
    <div v-if="this.$store.state.checkPoint === 2"><screen_start_02/></div>
    <div v-if="this.$store.state.checkPoint === 3"><content_02/></div>
  </div>
</template>

<script>
import content_01 from '@/components/content/content_01.vue'
import content_02 from '@/components/content/content_02.vue'
import screen_start_01 from '@/components/screen/screen_start_01.vue'
import screen_start_02 from '@/components/screen/screen_start_02.vue'
import store from '@/store'

export default {
  name: 'HomeView',
  components: {
    content_01,
    content_02,
    screen_start_01,
    screen_start_02,
  },
  data(){
    return{
      m:0,
    }
  },
  mounted(){
    this.heightQuestion()
  },
  methods:{
    updataCheckPoint(){
      store.commit('next');
      this.heightQuestion()
    },
    backCheckPoint(){
      store.commit('back');
      this.heightQuestion()
    },
    retry(){
      this.heightQuestion()
    },
    editor(){
      store.commit('editor')
      this.heightQuestion()
    },
    open0(){
      store.commit('reset')
      this.heightQuestion()
    },
    toMenu1(){
      this.m = 0;
    },
    toMenu2(){
      this.m = 1;
    },
    async mainTitle(){
      await store.commit('mainTitle')
      this.heightQuestion()
    },
    heightQuestion(){
      let empty0 = document.getElementById('empty0')
      let empty1 = document.getElementById('empty1')
      this.$store.state.checkPoint >= 0 ? empty0.style.height = 0:empty0.style.height = '1rem'
      this.$store.state.checkPoint   >= 0 ? empty1.style.height = 0:empty1.style.height = '1rem'
    },
  }
}
</script>

<style lang="scss">
:root{
  --text_color:white;
  --background_color:black;
  --text_color_hover:black;
  --background_color_hover:white;
}
html{
    background-color: var(--background_color);
}
.home{
  display: block;
  .title{
    display: flex;
    color: var(--text_color);
    justify-content: center;
    text-align: center;
    height: 15rem;
    margin: auto;
    font-size: 5rem;
    align-items:center;
    font-family: STXingkai,'华文行楷',sans-serif;
  }
  .item{
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text_color);
  border: var(--text_color) solid 0.2rem;
  font-size: 1rem;
  font-weight: bold;
  width: 15rem;
  margin: auto;
  padding: 2rem;
  }
  .item:hover {
  background-color: var(--background_color_hover);
  color: var(--text_color_hover);
  }
}
</style>
