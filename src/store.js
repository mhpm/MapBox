import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Users: require("./data/Users.json")
  },
  mutations: {

  },
  actions: {

  }
})
