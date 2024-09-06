<template>
  <div class="dispaly">
    <div class="dispaly__title">Вы находитесь в категории: избранное.</div>
    <div class="dispaly__list" @scroll="scroll" ref="dispalyList">
      <div class="card" v-for="(card, i) in get_list_FC" :key="i" ref="card">
        <div class="card__img">
          <img :src="card.img" alt="" />
        </div>
        <div class="card__name"><span>{{ card.name }} </span></div>
        <div class="card__brn-container">
          <!-- <div class="card__learn-more">Узнать больше</div> -->

          <router-link
            class="card__learn-more"
            :to="{ name: 'displayInfo', params: { id: card.id } }"
            >Узнать больше
          </router-link>

          <div class="card__delete-favorites" @click="deleteAndReser(card)">
            Удалить из избранного
          </div>
        </div>
      </div>
      <div class="card" v-if="!get_list_FC.length">Ваш список пуст, добавьте что нибудь ...</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Display",
  data: () => ({}),
  props: {},
  methods: {
    ...mapActions("favorites", [
      "setScrollTopFC",
      "resetLocalStorage",
      "deleteItemInList",
    ]),
    ...mapActions("allCoctails", ["resetFavoriteInList"]),

    scroll() {
      const valueScrollTop = this.$refs.dispalyList.scrollTop;
      this.setScrollTopFC(valueScrollTop);
    },
    deleteAndReser(card) {
      this.resetFavoriteInList({ id: Number(card.id), value: false });
      this.deleteItemInList(Number(card.id));
      this.resetLocalStorage();
    },
  },
  computed: {
    ...mapGetters("favorites", ["get_list_FC", "scroll_top_FC"]),
  },
  mounted() {
    this.$refs.dispalyList.scrollTop = this.scroll_top_FC;
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


btn-card-delete()
  text-align: center
  border: 1px solid #dd7575
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
    overflow-y: scroll
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 33px;

.card
  max-width 233px
  padding 10px
  background-color #3a3a3a
  height: 400px
  &__img
    margin-bottom 10px
    img
      width 100%
      height 100%
      object-fit: contain
  &__name
    margin-bottom 10px
    font-size: 19px
    height: 50px;
    display: flex;
    align-items: center;
  &__learn-more
    btn-card()
    margin-bottom 10px
    display: block
    &:hover
      background-color #cd75dd
      color: #3a3a3a
  &__add-favorites
    btn-card()
    &:hover
      background-color #cd75dd
      color: #3a3a3a
  &__delete-favorites
    btn-card-delete()
    &:hover
      background-color #dd7575
      color: #3a3a3a


.tracking
  position: absolute;
  width: 93%;
  height: 10%;
  bottom: 32%;



/* полоса прокрутки (скроллбар) */
::-webkit-scrollbar {
  width: 7px; /* ширина для вертикального скролла */
  background-color: #3a3a3a;

}

/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
  background-color: #765569;
  border-radius: 9em;
}
</style>
