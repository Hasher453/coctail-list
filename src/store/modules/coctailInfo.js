import Vue from "vue";
import axios from "../../plugins/axios/index";
import translate from "translate";

async function normalizationResponse(obj) {
  try {
    // перевод
    const str = JSON.stringify(obj);
    const ruText = await translate(str, {
      from: "en",
      to: "ru",
    });
    let ruObjCoctail = JSON.parse(ruText);

    // создание строки с приготовлением
    let strIngredients = "";
    for (let i = 1; i < 16; i++) {
      let strIngredient = ruObjCoctail[`strIngredient${i}`];
      let strMeasure = obj[`strMeasure${i}`];
      if (!strIngredient && !strMeasure) break;
      if (!strIngredient) strIngredient = "";
      if (!strMeasure) strMeasure = "";
      strMeasure.trim();
      strIngredients = strIngredients.concat(
        "; ",
        strMeasure,
        " ",
        strIngredient
      );
    }
    strIngredients = strIngredients.slice(2);

    // узнать алкогольный или нет
    let alcoholic = null;
    obj.strAlcoholic === "Alcoholic" ? (alcoholic = true) : (alcoholic = false);

    if (localStorage.favoriteCocktails) {
      // вариант если есть локалсторадж
      const arrayLocalStorage = Object.values(
        JSON.parse(localStorage.favoriteCocktails)
      );
      const id = obj.idDrink;
      const favorite = arrayLocalStorage.some((coctail) => coctail.id === id);

      return {
        id: obj.idDrink,
        name: ruObjCoctail.strDrink,
        category: ruObjCoctail.strCategory,
        alcoholic,
        glass: ruObjCoctail.strGlass,
        instructions: ruObjCoctail.strInstructions,
        img: obj.strDrinkThumb.replace(" ", ""),
        strIngredients,
        favorite,
      };
    } else {
      return {
        id: obj.idDrink,
        name: ruObjCoctail.strDrink,
        category: ruObjCoctail.strCategory,
        alcoholic,
        glass: ruObjCoctail.strGlass,
        instructions: ruObjCoctail.strInstructions,
        img: obj.strDrinkThumb.replace(" ", ""),
        strIngredients,
        favorite: false,
      };
    }
  } catch (err) {
    err;
    console.log(err);
  }
}

const allCoctails = {
  namespaced: true,
  state: {
    infoCocktail: {},
  },
  getters: {
    coctail_info: ({ infoCocktail }) => infoCocktail,
  },
  mutations: {
    SET_INFO_COCKTAIL(state, data) {
      state.infoCocktail = data;
    },
    CLEAR_INFO_COCKTAIL(state) {
      state.infoCocktail = {};
    },
    RESET_DATA_FAVORITE(state, value) {
      state.infoCocktail.favorite = value;
    },
  },
  actions: {
    async fetchInfoCoctailById({ commit, state }, id) {
      try {
        const response = await axios
          .get(`/lookup.php?i=${id}`)
          .then((data) => data.drinks[0]);

        const normalRes = await normalizationResponse(response);

        commit("SET_INFO_COCKTAIL", normalRes);
      } catch (err) {
        console.log(err);
      }
    },
    clearInfoCoctail({ commit }) {
      commit("CLEAR_INFO_COCKTAIL");
    },
    resetFavorite({ commit }, value) {
      commit("RESET_DATA_FAVORITE", value);
    },
  },
};

export default allCoctails;
