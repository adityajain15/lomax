import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    stamenCords: {},
    styleCords: {},
    petalFilter: {},
    stamenFilter: {},
    styleFilter: {},
    people: [],
    styleTooltip: ''
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
    },
    getStamenFilter: state => {
      return state.stamenFilter
    },
    getStyleFilter: state => {
      return state.styleFilter
    },
    getPersonData: state => {
      return (person, county) => {
        return state.people.filter((d) => d.name === person && d.county === county)[0]['Data']
      }
    },
    displayStyleTooltip: state => {
      return !(state.styleTooltip === '')
    },
    styleTooltipX: (state, getters) => {
      if (getters.displayStyleTooltip) {
        return state.styleTooltip.mouseX
      }
      return 0
    },
    styleTooltipY: (state, getters) => {
      if (getters.displayStyleTooltip) {
        return state.styleTooltip.mouseY
      }
      return 0
    },
    styleTooltipSongName: (state, getters) => {
      if (getters.displayStyleTooltip) {
        return state.styleTooltip.data.Title
      }
      return ''
    },
    styleTooltipArtists: (state, getters) => {
      if (getters.displayStyleTooltip) {
        return state.styleTooltip.data['Contributor Names']
      }
      return ''
    },
    styleTooltipDate: (state, getters) => {
      if (getters.displayStyleTooltip) {
        return state.styleTooltip.data['Created / Published'].date
      }
      return ''
    },
    styleTooltipPlace: (state, getters) => {
      if (getters.displayStyleTooltip) {
        return `${state.styleTooltip.data['Created / Published'].place}, ${state.styleTooltip.data['Created / Published'].place}`
      }
      return ''
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
    },
    setStamenFilter: (state, obj) => {
      state.stamenFilter = obj
    },
    setStyleFilter: (state, obj) => {
      state.styleFilter = obj
    },
    setPeopleData: (state, resp) => {
      state.people = resp
    },
    setStyleToolTip: (state, obj) => {
      state.styleTooltip = obj
    }
  }
})
