import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
    images: {
      data: null
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    images(state) {
      return state.images;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_IMAGES(state, data) {
      state.images.data = data;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          id: user.uid,
        });
      } else {
        commit("SET_USER", null);
      }
    },
    fetchImages({ commit }, images) {
       commit("SET_IMAGES", {
          liked: images.liked,
          storageId: images.storageId         
       })
    }
  },
});
