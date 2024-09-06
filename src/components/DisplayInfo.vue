<template>
  <div class="dispaly">
    <div class="dispaly__title">
      Вы просматриваете информацию о коктейле: {{ coctail_info.name }}.
    </div>
    <div class="dispaly__list" ref="dispalyList">
      <div class="bg-loader" v-if="!opasity">
        <div class="loader">
          <div class="inner one"></div>
          <div class="inner two"></div>
          <div class="inner three"></div>
        </div>
      </div>
      <div class="dispaly__main-btn d-flex">
        <router-link class="close-button" :to="lastPath"
          >X
        </router-link>
        <div
          class="favorites-button"
          @click="addItemInFC"
          v-if="!coctail_info.favorite"
        >
          В избранное
        </div>
        <div
          class="favorites-button"
          v-if="coctail_info.favorite"
          @click="deleteItemInFC"
        >
          Удалить из избранного
        </div>
      </div>
      <div class="dispaly__main-info">
        <div class="dispaly__img">
          <img :src="img" alt="" />
        </div>
        <div class="dispaly__description">
          <div class="name-cocktail">
            <span>Название коктейля: </span>{{ coctail_info.name }}
          </div>
          <div class="sAlcoholic"><span>Коктейль: </span>{{ isAlcoholic }}</div>
          <div class="glass">
            <span>Для подачи потребуется : </span> {{ coctail_info.glass }}
          </div>
          <div class="category">
            <span>Категория: </span>{{ coctail_info.category }}
          </div>
        </div>
        <div class="dispaly__instruction">
          <div class="ingredient">
            <span>Для приготовления вам потребуется :</span>
            {{ coctail_info.strIngredients }}
          </div>
          <div class="cooking-method">
            <span>Cпособ приготовления: </span>
            {{ coctail_info.instructions }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Display",
  data: () => ({
    opasity: false,
  }),

  methods: {
    ...mapActions("coctailInfo", [
      "fetchInfoCoctailById",
      "clearInfoCoctail",
      "resetFavorite",
    ]),
    ...mapActions("favorites", [
      "addItemInList",
      "resetLocalStorage",
      "deleteItemInList",
    ]),
    ...mapActions("allCoctails", ["resetFavoriteInList"]),
    addItemInFC() {
      this.resetFavoriteInList({ id: this.coctail_info.id, value: true });
      this.resetFavorite(true);
      this.addItemInList(this.coctail_info);
      this.resetLocalStorage();
    },
    deleteItemInFC() {
      this.resetFavoriteInList({ id: this.coctail_info.id, value: false });
      this.resetFavorite(false);
      this.deleteItemInList(this.coctail_info.id);
      this.resetLocalStorage();
    },
  },
  computed: {
    ...mapGetters("coctailInfo", ["coctail_info"]),
    ...mapGetters("routeData", ["get_from"]),
    isAlcoholic() {
      let resault = null;
      this.coctail_info.alcoholic
        ? (resault = "алкогольный")
        : (resault = "безалкогольный");
      return resault;
    },
    ingredients() {
      if (this.coctail_info.ingredients) {
        const ingredients = this.coctail_info.ingredients;
        const ingredientsStr = Object.values(ingredients).join(", ");
        return ingredientsStr;
      }
    },
    img() {
      if (this.coctail_info.img) {
        return this.coctail_info.img;
      }
    },
    lastPath(){
      return String(this.get_from.fullPath)
    }
  },
  async created() {
    const id = this.$route.params.id;
    await this.fetchInfoCoctailById(id);
  },
  mounted() {
    setTimeout(() => (this.opasity = true), 600);
  },
  destroyed() {
    this.clearInfoCoctail();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
btn-card()
  text-align: center
  border: 1px solid #cd75dd
  padding 9px
  border-radius 7px
  font-size: 17px
  transition: 0.2s all ease;
  cursor pointer



.dispaly
  background-color #222
  border 1px solid #333
  border-radius: 10px
  padding 20px 30px
  width -webkit-fill-available
  position relative
  &__title
    margin-bottom 20px
    font-weight 700
    font-size: 19px;
  &__list
    height 750px
    background-color #2a2a2a
    border-radius: 10px
    padding 10px 20px
    overflow-y: scroll
    position relative
  &__img
    max-width: 324px;
    height: 323px;
    float: left;
    margin-right: 20px;
    img
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
  &__main-btn
    margin-bottom: 20px;
    .close-button
      background-color: #a631cd;
      border-radius: 10px 0px 0px 10px;
      padding: 12px 15px;
      cursor: pointer;
      font-size: 18px;
    .favorites-button
      background-color: #897777;
      border-radius: 0px 10px 10px 0px;
      padding: 12px;
      cursor: pointer;
      font-size: 18px;
      margin-left: 6px;
  &__description > div
    font-size: 20px;
    margin-bottom: 20px
  &__description span
    font-weight bold
  &__instruction
    font-size 20px
    .cooking-method
      line-height 30px
    .ingredient
      margin-bottom 10px
      line-height 30px

  &__instruction span
    font-weight bold
  &__instruction ul
    list-style-type none


@keyframes show {
  from { opacity: 1; }
  to { opacity: 0; }
}

//прилоадер
.bg-loader
  width 100%
  height 100%
  position: absolute
  top 0
  left 0
  background-color #2a2a2a
  overflow hidden
  animation: 1s show ease;


.loader {
  position: absolute;
  top: calc(50% - 32px);
  left: calc(50% - 32px);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  perspective: 800px;
}

.inner {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.inner.one {
  left: 0%;
  top: 0%;
  animation: rotate-one 1s linear infinite;
  border-bottom: 3px solid #EFEFFA;
}

.inner.two {
  right: 0%;
  top: 0%;
  animation: rotate-two 1s linear infinite;
  border-right: 3px solid #EFEFFA;
}

.inner.three {
  right: 0%;
  bottom: 0%;
  animation: rotate-three 1s linear infinite;
  border-top: 3px solid #EFEFFA;
}

@keyframes rotate-one {
  0% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate-two {
  0% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate-three {
  0% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}



::-webkit-scrollbar {
  width: 7px; /* ширина для вертикального скролла */

}

/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
  background-color: #765569;
  border-radius: 9em;
}
</style>
