export default {
  namespaced: true,
  state: () => ({
    msg: 'fucking'
  }),
  getters: {
    reversedMsg(state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {
    updateMsg(state, newMsg) {
      state.msg = newMsg
    }
  },
  actions: {
    reverseMsg({state, commit}) {
      const newMsg = state.msg.split('').reverse().join('')
      commit('updateMsg', newMsg)
    }
  },
};
