import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkPoint:-1,
  },
  getters: {
  },
  mutations: {
    reset(state){
      state.checkPoint = 0
    },
    next(state){
      if(state.checkPoint < 20){
        state.checkPoint++
      }else return
    },
    back(state){
      if(state.checkPoint > 600){
        state.checkPoint = -1;
      }else if (state.checkPoint > -1){
        state.checkPoint--;
      }else return
    },
    mainTitle(state){
      state.checkPoint = -1;
    },
    editor(state){
      state.checkPoint = 666;
    },
  },
  actions: {
  },
  modules: {
  }
})
