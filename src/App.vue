<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
    name: 'HomeView',
    data(){
      return{

      }
    },
    mounted(){
    },
    methods:{
    }
  }

</script>

<style lang="scss">
#app{
  
}
nav {
  background-color: black;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: width 0.6s linear;
  overflow-x: hidden;
  ul{
    display: flex;
    justify-content: space-around;
    text-align: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    color: white;
    font-weight: bold;
    li.text{
      width: 100%;
    }
    li.text:hover{
      background-color: white;
      color: black;
    }
  }
}
</style>
