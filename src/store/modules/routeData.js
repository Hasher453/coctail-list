import Vue from "vue";

const routeData = {
  namespaced: true,
  state: {
    from: {
      name: "display",
      meta: {},
      path: "/",
      hash: "",
      query: {},
      params: {},
      fullPath: "/",
      matched: [
        {
          path: "",
          regex: "[native RegExp /^(?:\\/(?=$))?$/i]",
          components: {
            default: {
              _custom: {
                type: "component-definition",
                display: "Display <span>(src/components/Display.vue)</span>",
                tooltip: "Component definition",
                file: "src/components/Display.vue",
              },
            },
          },
          alias: [],
          instances: {},
          enteredCbs: {},
          name: "display",
          meta: {},
          props: {},
        },
      ],
    },
    to: {},
  },
  getters: {
    get_from: ({ from }) => {
      return from;
    },
    get_to: ({ to }) => {
      return to;
    },
  },
  mutations: {
    SET_DATA_FROM_TO(state, data) {
      state.from = data.from;
      state.to = data.to;
    },
  },
  actions: {
    setFromTo({ commit }, obj) {
      commit("SET_DATA_FROM_TO", obj);
    },
  },
};

export default routeData;
