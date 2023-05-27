export const state = () => ({
  loggedIn: process.client ? localStorage.getItem('loggedIn') : false,
  user: process.client ? JSON.parse(localStorage.getItem('user')) : {},
})

export const getters = {
  GET_LOGGEDIN: state => state.loggedIn,
  GET_USER: state => state.user
}

export const actions = {

}

export const mutations = {
  SET_LOGGEDIN(state, payload) {
    state.loggedIn = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  }
}
