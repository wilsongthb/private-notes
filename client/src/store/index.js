import AuthServices from "src/auth-module/AuthServices";
import http from "src/utils/http";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async setup({ commit }) {
      try {
        if (AuthServices.checkIfHasToken()) {
          let user = (await http.get("api/auth/users/me/")).data;
          commit("setUser", user);
        } else {
          throw "no logued";
        }
      } catch (e) {
        AuthServices.logout();
      }
    }
  },
  modules: {}
});
