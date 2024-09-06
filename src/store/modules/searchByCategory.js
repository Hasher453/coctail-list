import Vue from 'vue';
import axios from '../../plugins/axios/index';
import translate from 'translate';

async function normalizationListCoctails(arrayCoctails) {
  const normalList = arrayCoctails.map(async (coctail) => {
    try {
      const str = JSON.stringify(coctail);
      const ruText = await translate(str, {
        from: 'en',
        to: 'ru',
      });
      let ruObjCoctail = JSON.parse(ruText);

      let strIngredients = '';
      for (let i = 1; i < 16; i++) {
        let strIngredient = ruObjCoctail[`strIngredient${i}`];
        let strMeasure = coctail[`strMeasure${i}`];
        if (!strIngredient && !strMeasure) break;
        if (!strIngredient) strIngredient = '';
        if (!strMeasure) strMeasure = '';
        strMeasure.trim();
        strIngredients = strIngredients.concat(
          '; ',
          strMeasure,
          ' ',
          strIngredient
        );
      }
      strIngredients = strIngredients.slice(2);

      //перевод от Alcoholic к true false
      let alcoholic = null;
      coctail.strAlcoholic === 'Alcoholic'
        ? (alcoholic = true)
        : (alcoholic = false);

      return {
        id: ruObjCoctail.idDrink,
        alcoholic,
        name: ruObjCoctail.strDrink,
        img: coctail.strDrinkThumb.replace(' ', ''),
        glass: ruObjCoctail.strGlass,
        strIngredients,
        instructions: ruObjCoctail.strInstructions,
        category: ruObjCoctail.strCategory,
      };
    } catch (err) {
      err;
    }
  });
  const array = await Promise.all(normalList);
  const arrayFilter = array.filter((element) => element != undefined);

  //Если нет локал сторадж запустится эта часть кода
  if (!localStorage.favoriteCocktails) {
    const finalArray = arrayFilter.map((el) => {
      return {
        ...el,
        favorite: false,
      };
    });
    return finalArray;
  }

  //Если есть локал сторадж запустится эта часть кода
  const arrayLocalStorage = Object.values(
    JSON.parse(localStorage.favoriteCocktails)
  );
  const finalArray = arrayFilter.map((el) => {
    const id = el.id;
    const favorite = arrayLocalStorage.some((coctail) => coctail.id === id);
    return {
      ...el,
      favorite,
    };
  });
  return finalArray;
}

async function shortNormalizationListCoctails(arrayCoctails) {
  const normalList = arrayCoctails.map(async (coctail) => {
    try {
      const str = JSON.stringify(coctail);
      const ruText = await translate(str, {
        from: 'en',
        to: 'ru',
      });
      let ruObjCoctail = JSON.parse(ruText);

      //перевод от Alcoholic к true false
      let alcoholic = null;
      coctail.strAlcoholic === 'Alcoholic'
        ? (alcoholic = true)
        : (alcoholic = false);

      return {
        id: ruObjCoctail.idDrink,
        alcoholic,
        name: ruObjCoctail.strDrink,
        img: coctail.strDrinkThumb.replace(' ', ''),
      };
    } catch (err) {
      err;
    }
  });
  const array = await Promise.all(normalList);
  const arrayFilter = array.filter((element) => element != undefined);

  //Если нет локал сторадж запустится эта часть кода
  if (!localStorage.favoriteCocktails) {
    const finalArray = arrayFilter.map((el) => {
      return {
        ...el,
        favorite: false,
      };
    });
    return finalArray;
  }

  //Если есть локал сторадж запустится эта часть кода
  const arrayLocalStorage = Object.values(
    JSON.parse(localStorage.favoriteCocktails)
  );
  const finalArray = arrayFilter.map((el) => {
    const id = el.id;
    const favorite = arrayLocalStorage.some((coctail) => coctail.id === id);
    return {
      ...el,
      favorite,
    };
  });
  return finalArray;
}

const searchByCategory = {
  namespaced: true,
  state: {
    allCoctailsList: [{ err: true }],
  },
  getters: {
    coctails_list: ({ allCoctailsList }) => allCoctailsList,
  },
  mutations: {
    ADD_COCTAILS_LIST(state, coctailsList) {
      state.allCoctailsList = [...coctailsList];
    },
    RESET_FAVORITE_IN_LIST(state, { id, value }) {
      // Vue.delete(state.buyListUnactive, id);
      state.allCoctailsList.forEach((cocktail) => {
        if (cocktail.id === String(id)) {
          cocktail.favorite = value;
        }
      });

      // state.allCoctailsList[id].favorite = value;
    },
  },
  actions: {
    async fetchCoctailsByName({ commit, state }, data) {
      try {
        const enText = await translate(data, {
          from: 'ru',
          to: 'en',
        });
        const response = await axios
          .get(`search.php?s=${enText}`)
          .then((data) => data.drinks);

        if (response === undefined || response === null)
          return commit('ADD_COCTAILS_LIST', [{ err: true }]);

        const ruResponse = await normalizationListCoctails(response);

        commit('ADD_COCTAILS_LIST', ruResponse);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchCoctailsByIngredient({ commit, state }, data) {
      try {
        const enText = await translate(data, {
          from: 'ru',
          to: 'en',
        });
        const response = await axios
          .get(`filter.php?i=${enText}`)
          .then((data) => data.drinks);

        if (response === undefined || response === null)
          return commit('ADD_COCTAILS_LIST', [{ err: true }]);

        const ruResponse = await shortNormalizationListCoctails(response);

        commit('ADD_COCTAILS_LIST', ruResponse);
      } catch (err) {
        console.log(err);
      }
    },
    resetFavoriteInLBC({ commit }, objData) {
      commit('RESET_FAVORITE_IN_LIST', objData);
    },
  },
};

export default searchByCategory;
