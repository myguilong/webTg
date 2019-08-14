import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     users:{
       
     }
  },
  mutations: {
      setUser(state,users){
           // eslint-disable-next-line no-console
           state.users = users
      }
  },
  actions: {

  }
})
