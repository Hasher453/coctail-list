import Vue from "vue";
import Vuex from "vuex";
// modele
import allCoctails from "./modules/allCoctails";
import coctailInfo from "./modules/coctailInfo";
import favorites from "./modules/favorites";
import routeData from "./modules/routeData";
import searchByCategory from "./modules/searchByCategory";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    allCoctails,
    coctailInfo,
    favorites,
    routeData,
    searchByCategory,
  },
});
