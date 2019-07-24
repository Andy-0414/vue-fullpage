import Vue from 'vue'
import Vuex from 'vuex'
import { Router } from './routerData'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerPosition:
      [[{
        name: "main",
        path: "/",
        deep: 0
      }],
      [{
        name: "page1",
        path: "/page1",
        deep: 1,
        floor: 0
      }, {
        name: "page2",
        path: "/page2",
        deep: 1,
        floor: 1
      }],
      [{
        name: "page3",
        path: "/page3",
        deep: 2,
        floor: 0
      }, {
        name: "page4",
        path: "/page4",
        deep: 2,
        floor: 1
      }]]
  },
  mutations: {

  },
  actions: {

  }
})
