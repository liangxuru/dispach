
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  isLoading: false
}

// getters
const getters = {
  
}

// actions
const actions = {
  // 改变是否正在加载状态
  setLoading ({commit}, platform) {
    commit(types.SET_LOADING, platform);
  }
}

// mutations
const mutations = {
  //设置是否在加载
  [types.SET_LOADING] (state, platform){
    state.isLoading = platform;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
