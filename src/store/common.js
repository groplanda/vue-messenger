export default {
  state: () => ({
    loading: null,
    error: null,
  }),
  mutations: {
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    clearError (state) {
      state.error = null;
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload);
    },
    setError ({commit}, payload) {
      commit('setError', payload);
    },
    clearError ({commit}) {
      commit('clearError');
    },
  },
  getters: {
    getLoading (state) {
      return state.loading;
    },
    getError (state) {
      return state.error;
    },
  }
}