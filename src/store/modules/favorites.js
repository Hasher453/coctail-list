import Vue from "vue";

const favorites = {
  namespaced: true,
  state: {
    listFavoriteCocktails: {},
    scrollTop: 0,
  },
  getters: {
    get_list_FC: ({ listFavoriteCocktails }) =>  Object.values(listFavoriteCocktails),
    scroll_top_FC: ({ scrollTop }) => Number(scrollTop),
  },
  mutations: {
    SET_DATA_FROM_LS(state, data) {
      state.listFavoriteCocktails = data;
    },
    ADD_ITEM_IN_LIST(state, item) {
      Vue.set(state.listFavoriteCocktails, item.id, item);
    },
    DELETE_ITEM_IN_LIST(state, id) {
      Vue.delete(state.listFavoriteCocktails, id);
    },
    SET_SCROLL_TOP(state, value) {
      state.scrollTop = value;
    },

  },
  actions: {
    setDataFromLocalStorage({ commit }) {
      try {
        const dataJSON = localStorage.favoriteCocktails;
        if (dataJSON) {
          const data = JSON.parse(dataJSON);
          commit("SET_DATA_FROM_LS", data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    addItemInList({ commit }, item) {
      commit("ADD_ITEM_IN_LIST", item);
    },
    deleteItemInList({ commit }, id) {
      commit("DELETE_ITEM_IN_LIST", id);
    },
    resetLocalStorage({ state }) {
      const jsonObj = JSON.stringify(state.listFavoriteCocktails);
      if (jsonObj) {
        localStorage.setItem("favoriteCocktails", jsonObj);
      }
    },
    setScrollTopFC({ commit }, value){
      commit("SET_SCROLL_TOP", value);
    }

  },
};

export default favorites;
