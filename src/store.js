import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    stamenCords: {},
    styleCords: {},
    styleFilter: {},
    people: [],
    tooltip: {},
    displayTooltip: false,
    modalData: {},
    displayModal: false,
    displayLegend: false,
    appWidth: 500,
    allData: []
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
        if (state.people.length === 0) { return '' }
        return state.people.filter((d) => d.name === person && d.county === county)[0]['Data']
      }
    },
    tooltipX: (state, getters) => {
      if (getters.getDisplayTooltip) {
        return state.tooltip.mouseX
      }
      return 0
    },
    tooltipY: (state, getters) => {
      if (getters.getDisplayTooltip) {
        return state.tooltip.mouseY
      }
      return 0
    },
    tooltipText: (state, getters) => {
      if (getters.getDisplayTooltip) {
        return state.tooltip.text
      }
      return ''
    },
    modalIsPerson: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.type === 'person'
      }
      return false
    },
    modalPerson: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.name
      }
      return ''
    },
    modalPersonSongs: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.data
      }
      return ''
    },
    modalPOP: (state, getters) => {
      if (getters.getDisplayModal) {
        return `${state.modalData.county}, ${state.modalData.state}`
      }
      return ''
    },
    modalPersonCounty: (state, getters) => {
      if (getters.getDisplayModal) {
        return `${state.modalData.county}`
      }
      return ''
    },
    modalIsCounty: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.type === 'county'
      }
      return false
    },
    modalIsSong: (state, getters) => {
      if (getters.getDisplayModal) {
        return state.modalData.type === 'song'
      }
      return false
    },
    modalSongName: (state, getters) => {
      if (getters.getDisplayModal && getters.modalIsSong) {
        return state.modalData.data.Title
      }
      return ''
    },
    modalArtists: (state, getters) => {
      if (getters.getDisplayModal && getters.modalIsSong) {
        return state.modalData.data['Contributor Names']
      }
      return ''
    },
    modalDate: (state, getters) => {
      if (getters.getDisplayModal && getters.modalIsSong) {
        return state.modalData.data['Created / Published'].date
      }
      return ''
    },
    modalPlace: (state, getters) => {
      if (getters.getDisplayModal && getters.modalIsSong) {
        return `${state.modalData.data['Created / Published'].place}, ${state.modalData.data['Created / Published'].state}`
      }
      return ''
    },
    modalGenres: (state, getters) => {
      if (getters.getDisplayModal && getters.modalIsSong) {
        if (state.modalData.data.Genre === 'Music' || state.modalData.data.Genre === 'Songs') { return [] }
        return state.modalData.data.Genre.filter(d => { return d !== 'Music' && d !== 'Songs' })
      }
      return ''
    },
    modalNotes: (state, getters) => {
      if (getters.getDisplayModal && getters.modalIsSong) {
        return state.modalData.data.Notes
      }
      return ''
    },
    modalAudioUrl: (state, getters) => {
      if (getters.getDisplayModal && getters.modalIsSong) {
        let fileName = state.modalData.data.audioUrl.slice(state.modalData.data.audioUrl.lastIndexOf('/') + 1)
        return `./static/audio_files/${fileName}`
      }
      return ''
    },
    getDisplayTooltip: (state) => {
      return state.displayTooltip
    },
    getDisplayModal: (state) => {
      return state.displayModal
    },
    getDisplayLegend: (state) => {
      return state.displayLegend
    },
    getAppWidth: (state) => {
      return state.appWidth
    },
    getData: (state) => {
      return (theState) => {
        return state.allData.filter((d) => {return d['Created / Published']['state'] === theState})
      }
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
    setTooltip: (state, obj) => {
      state.tooltip = obj
    },
    setDisplayTooltip: (state, value) => {
      state.displayTooltip = value
    },
    setModal: (state, obj) => {
      state.modalData = obj
    },
    setDisplayModal: (state, value) => {
      state.displayModal = value
    },
    setDisplayLegend: (state, value) => {
      state.displayLegend = value
    },
    setAppWidth: (state, value) => {
      state.appWidth = value
    },
    setData: (state, value) => {
      state.allData = value
    }
  }
})
