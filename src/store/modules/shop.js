
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  name: '',
  user: {}
}

// getters
const getters = {
  
}

// actions
const actions = {
  setName ({commit}, platform) {
    commit(types.SET_NAME, platform);
  },
  setUser ({commit}, platform) {
    commit(types.SET_USER, platform);
  }
}

// mutations
const mutations = {
  [types.SET_NAME] (state, platform){
    state.name = platform;
  },
  [types.SET_USER] (state, platform){
    state.user = platform;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
