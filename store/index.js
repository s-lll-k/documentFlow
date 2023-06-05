export const state = () => ({
  loggedIn: process.client ? localStorage.getItem('loggedIn') : false,
  user: process.client ? JSON.parse(localStorage.getItem('user')) : {},
  calendarEvent: null
})

export const getters = {
  GET_LOGGEDIN: state => state.loggedIn,
  GET_USER: state => state.user
}

export const actions = {
  SET_EVENT({ commit }, obj) {
    commit('SET_EVENT', obj);
  }
}

export const mutations = {
  SET_LOGGEDIN(state, payload) {
    state.loggedIn = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_EVENT(state, obj) {
    state.calendarEvent = obj;
  }
}
