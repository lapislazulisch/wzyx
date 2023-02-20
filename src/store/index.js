import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkPoint:-1,
    f:true,
  },
  getters: {
  },
  mutations: {
    reset(state){
      state.checkPoint = 0
    },
    next(state){
      if(state.f){
        if(state.checkPoint < 20){
        this.commit('initializeCheckPointup')
        }else return
      }else return
      
    },
    back(state){
      if(state.f){
        if(state.checkPoint > 600){
          state.checkPoint = -1;
        }else if (state.checkPoint > -1){
          this.commit('initializeCheckPointdown');
        }else return
      }else return
    },
    mainTitle(state){
      state.checkPoint = -1;
    },
    editor(state){
      state.checkPoint = 666;
    },
    initializeCheckPointup(state){
      state.checkPoint += 1;
      state.f = false;
      setTimeout(() => {state.f = true}, 3000);
    },
    initializeCheckPointdown(state){
      state.checkPoint -= 1;
      state.f = false;
      setTimeout(() => {state.f = true}, 3000);
    },
  },
  actions: {
  },
  modules: {
  }
})
