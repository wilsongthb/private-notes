import Axios from "axios";
import { secureStorage } from "../utils/secureStorage.js";

export const authStore = function(http = Axios) {
  return {
    namespaced: true,
    state: {
      logged: secureStorage.getItem("token") !== null
    },
    mutations: {
      loginSuccess(state) {
        state.logged = true;
      },
      logout(state) {
        state.logged = false;
      }
    },
    actions: {
      setToken({ commit }, token) {
        commit.logged = true;
        secureStorage.setItem("token", token);
        http.defaults.headers["Authorization"] = secureStorage.getItem("token");
      },
      /**
       *
       * Accion de autenticacion en el servidor
       *
       */
      login({ commit, dispatch }, userVals) {
        return new Promise((resolve, error) => {
          http
            .post("oauth/token", {
              ...userVals,
              grant_type: process.env.VUE_APP_GRANT_TYPE,
              client_id: process.env.VUE_APP_CLIENT_ID,
              client_secret: process.env.VUE_APP_CLIENT_SECRET,
              scope: process.env.VUE_APP_SCOPE
            })
            .then(
              (res) => {
                dispatch(
                  "setToken",
                  `${res.data.token_type} ${res.data.access_token}`
                );
                commit("loginSuccess");
                resolve();
              },
              ({ response }) => {
                error(
                  (response && response.data.message) ||
                    "Error al intentar autenticar"
                );
              }
            );
        });
      },

      logout({ commit }) {
        return new Promise((resolve) => {
          secureStorage.clear();
          commit("logout");
          resolve();
        });
      }
    }
  };
};
