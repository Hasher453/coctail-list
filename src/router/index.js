import Router from "vue-router";
import Display from "../components/Display.vue";
import DisplayInfo from "../components/DisplayInfo.vue";
import DisplayFavorite from "../components/DisplayFavorite.vue";

const routes = [
  {
    path: "/",
    name: "display",
    component: Display,
  },
  {
    path: "/displayInfo=:id",
    name: "displayInfo",
    component: DisplayInfo,
  },
  {
    path: "/displayFavorite",
    name: "displayFavorite",
    component: DisplayFavorite,
  },
];

const router = new Router({
  mode: "history",
  base: "/",
  routes,
});

export default router;
