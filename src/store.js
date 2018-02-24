import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    stamenCords: {},
    styleCords: {},
    styleFilter: {},
    people: [],
    styleTooltip: {},
    displayStyleTooltip: false,
    modalData: {},
    displayModal: false,
    appWidth: 500
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
    getStyleFilter: state => {
      return state.styleFilter
    },
    getPersonData: state => {
      return (person, county) => {
        return state.people.filter((d) => d.name === person && d.county === county)[0]['Data']
      }
    },
    styleTooltipX: (state, getters) => {
      if (getters.getDisplayStyleTooltip) {
        return state.styleTooltip.mouseX
      }
      return 0
    },
    styleTooltipY: (state, getters) => {
      if (getters.getDisplayStyleTooltip) {
        return state.styleTooltip.mouseY
      }
      return 0
    },
    modalSongName: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.data.Title
      }
      return ''
    },
    modalArtists: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.data['Contributor Names']
      }
      return ''
    },
    modalDate: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.data['Created / Published'].date
      }
      return ''
    },
    modalPlace: (state, getters) => {
      if (getters.getDisplayModal) {
        return `${state.modalData.data['Created / Published'].place}, ${state.modalData.data['Created / Published'].place}`
      }
      return ''
    },
    modalGenres: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.data.Genre.filter(d => { return d !== 'Music' && d !== 'Songs' })
      }
      return ''
    },
    modalNotes: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.data.Notes
      }
      return ''
    },
    modalAudioUrl: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.data.audioUrl
      }
      return ''
    },
    getDisplayStyleTooltip: (state) => {
      return state.displayStyleTooltip
    },
    getDisplayModal: (state) => {
      return state.displayModal
    },
    getAppWidth: (state) => {
      return state.appWidth
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
    setStyleFilter: (state, obj) => {
      state.styleFilter = obj
    },
    setPeopleData: (state, resp) => {
      state.people = resp
    },
    setStyleToolTip: (state, obj) => {
      state.styleTooltip = obj
    },
    setDisplayStyleTooltip: (state, value) => {
      state.displayStyleTooltip = value
    },
    setModal: (state, obj) => {
      state.modalData = obj
    },
    setDisplayModal: (state, value) => {
      state.displayModal = value
    },
    setAppWidth: (state, value) => {
      state.appWidth = value
    }
  }
})
