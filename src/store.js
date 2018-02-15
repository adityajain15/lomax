import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    stamenCords: {},
    styleCords: {},
    petalFilter: {}
  },
  getters: {
    getStamenCordX: state => {
      return (queryObject) => {
        return state.stamenCords[queryObject.county][queryObject.name].x
      }
    },
    getStamenCordY: state => {
      return (queryObject) => {
        return state.stamenCords[queryObject.county][queryObject.name].y
      }
    },
    getStamenCords: state => {
      return (queryObject) => {
        return state.stamenCords[queryObject.county][queryObject.name]
      }
    },
    getStyleCordX: state => {
      return (id) => {
        return state.styleCords[id].x
      }
    },
    getStyleCordY: state => {
      return (id) => {
        return state.styleCords[id].y
      }
    },
    getStyleCords: state => {
      return (id) => {
        return state.styleCords[id]
      }
    },
    getPetalFilter: state => {
      return state.petalFilter
    }
  },
  mutations: {
    setStamenCords: (state, stamenRecord) => {
      if (!state.stamenCords.hasOwnProperty(stamenRecord.county)) {
        Vue.set(state.stamenCords, stamenRecord.county, {})
      }
      Vue.set(state.stamenCords[stamenRecord.county], stamenRecord.name, {x: stamenRecord.x, y: stamenRecord.y})
    },
    setStyleCords: (state, styleRecord) => {
      Vue.set(state.styleCords, styleRecord.id, {x: styleRecord.x, y: styleRecord.y})
    },
    setPetalFilter: (state, obj) => {
      state.petalFilter = obj
    }
  }
})
