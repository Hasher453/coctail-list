<template>
  <div id="app">
    <div class="wrap d-flex jc-space-between">
      <Sidebar />
      <router-view></router-view>
      <!-- <Display /> -->
      <!-- <DisplayInfo/> -->
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Display from "./components/Display.vue";
import DisplayInfo from "./components/DisplayInfo.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Sidebar,
    Display,
    DisplayInfo,
  },
  data: () => ({}),
  methods: {
    ...mapActions("favorites", [
      "setDataFromLocalStorage",
      "resetLocalStorage",
    ]),
    ...mapActions("routeData", ["setFromTo"]),
  },
  computed: {
    ...mapGetters("favorites", ["get_list_FC"]),
  },
  watch: {
    $route(to, from) {
      //this.$router.push('/user-admin')
      this.setFromTo({ from, to });
    },
  },
  mounted() {
    // установил сохраненные данные с локалСторедж в локальный лист
    if (!Object.keys(this.get_list_FC).length) {
      this.setDataFromLocalStorage();
    }
  },
};
</script>

<style lang="stylus">


body
  margin 0
  padding 0
  background-color: #141414
  color: #e1e3e6
  font-family 'Inter', Helvetica, Arial, sans-serif

ul
  list-style-type none
  padding 0

#app
  margin-top 45px

a
  color: white
  text-decoration: none

.wrap
  max-width: 1280px;
  box-sizing: content-box;
  margin: 0 auto;
  padding: 0 10px;

.d-flex
  display flex

.jc
  &-space-between
    justify-content: space-between

.button
  &-grey
    font-size: 16px;
    padding: 12px;
    background-color: #3a3a3a;
    border: none;
    color: white;
    cursor pointer
    border: 1px solid #565656;
    transition: 0.2s all ease;
    &:hover
      background-color: whitesmoke;
      color: #3a3a3a;


.border
  &-left
     border-radius: 10px 0px 0px 10px;
  &-right
     border-radius: 0px 10px 10px 0px;
</style>
