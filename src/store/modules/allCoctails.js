import Vue from "vue";
import axios from "../../plugins/axios/index";
import translate from "translate";

/*
idDrink - id
strAlcoholic - алкогольное ли
strCategory - категория
strDrink - название
strDrinkThumb - картинка
strGlass - стакан для подачи
нужно записать все strIngredient где нет null
strInstructions - инструкция для приготовления
*/

// async function normalizationListCoctails(arrayCoctails) {
//   const normalList = arrayCoctails.map(async (coctail) => {
//     try {
//       const str = JSON.stringify(coctail);
//       const ruText = await translate(str, {
//         from: "en",
//         to: "ru",
//       });
//       let ruObjCoctail = JSON.parse(ruText);
//       //создание объекта с ингридиентами
//       let arrayKeyValueIngredients = Object.entries(ruObjCoctail).splice(
//         17,
//         15
//       );
//       let activeIngredients = arrayKeyValueIngredients.filter((arr) => arr[1]);
//       let strIngredients = Object.fromEntries(activeIngredients);

//       //перевод от Alcoholic к true false
//       let boolAlcoholic = null;
//       ruObjCoctail.strAlcoholic === "Alcoholic"
//         ? (boolAlcoholic = true)
//         : (boolAlcoholic = false);

//       return {
//         strId: ruObjCoctail.idDrink,
//         boolAlcoholic,
//         strName: ruObjCoctail.strDrink,
//         strImg: ruObjCoctail.strDrinkThumb,
//         strGlass: ruObjCoctail.strGlass,
//         strIngredients,
//       };
//     } catch (err) {
//       return;
//     }
//   });
//   Promise.all(normalList).then((data) => console.log(data));
//   // const str = JSON.stringify(normalList);
//   // const ruText = await translate(str, {
//   //   from: 'en',
//   //   to: 'ru',
//   // });
//   // console.log(normalList);
// }

async function normalizationListCoctails(arrayCoctails) {
  const normalList = arrayCoctails.map(async (coctail) => {
    try {
      const str = JSON.stringify(coctail);
      const ruText = await translate(str, {
        from: "en",
        to: "ru",
      });
      let ruObjCoctail = JSON.parse(ruText);

      let strIngredients = "";
      for (let i = 1; i < 16; i++) {
        let strIngredient = ruObjCoctail[`strIngredient${i}`];
        let strMeasure = coctail[`strMeasure${i}`];
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

      //перевод от Alcoholic к true false
      let alcoholic = null;
      coctail.strAlcoholic === "Alcoholic"
        ? (alcoholic = true)
        : (alcoholic = false);

      return {
        id: ruObjCoctail.idDrink,
        alcoholic,
        name: ruObjCoctail.strDrink,
        img: coctail.strDrinkThumb.replace(" ", ""),
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

const allCoctails = {
  namespaced: true,
  state: {
    arr_en: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    currentLetter: 0,
    allCoctailsList: {},
    scrollTop: 0,
  },
  getters: {
    all_coctails_list: ({ allCoctailsList }) => Object.values(allCoctailsList),
    scroll_top: ({ scrollTop }) => Number(scrollTop),
  },
  mutations: {
    ADD_COCTAILS_LIST(state, coctailsList) {
      // state.allCoctailsList = [...state.allCoctailsList, ...coctailsList];

      state.allCoctailsList = { ...state.allCoctailsList, ...coctailsList };
    },
    NEXT_LETTER(state) {
      state.currentLetter += 1;
    },
    SET_SCROLL_TOP(state, value) {
      state.scrollTop = value;
    },
    RESET_FAVORITE_IN_LIST(state, { id, value }) {
      // Vue.delete(state.buyListUnactive, id);
      state.allCoctailsList[id].favorite = value;
    },
  },
  actions: {
    async fetchListCoctails({ commit, state }) {
      try {
        const arr_en = state.arr_en;
        const currentLetter = state.currentLetter;
        commit("NEXT_LETTER");

        const response = await axios
          .get(`/search.php?f=${arr_en[currentLetter]}`)
          .then((data) => data.drinks);

        const normalArray = await normalizationListCoctails(response);

        const objNormalArray = normalArray.reduce((acc, cocktail) => {
          acc[cocktail.id] = cocktail;
          return acc;
        }, {});

        commit("ADD_COCTAILS_LIST", objNormalArray);
      } catch (err) {
        console.log(err);
      }
    },
    setScrollTop({ commit }, value) {
      commit("SET_SCROLL_TOP", value);
    },
    resetFavoriteInList({ commit }, objData) {
      commit("RESET_FAVORITE_IN_LIST", objData);
    },
  },
};

export default allCoctails;
