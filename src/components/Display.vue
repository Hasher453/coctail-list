<template>
  <div class="dispaly">
    <div class="dispaly__title">Вы находитесь в категории: все коктейли.</div>
    <div class="dispaly__list" @scroll="scroll" ref="dispalyList">
      <div
        class="card"
        v-for="(card, i) in all_coctails_list"
        :key="i"
        ref="card"
      >
        <div class="card__img">
          <img :src="card.img" alt="" />
        </div>
        <div class="card__name">{{ card.name }}</div>
        <div class="card__brn-container">
          <!-- <div class="card__learn-more">Узнать больше</div> -->

          <router-link
            class="card__learn-more"
            :to="{ name: 'displayInfo', params: { id: card.id } }"
            >Узнать больше
          </router-link>

          <div
            class="card__add-favorites"
            @click="addItemInFC(card)"
            v-if="!card.favorite"
          >
            Добавить в избранное
          </div>
          <div
            class="card__delete-favorites"
            v-if="card.favorite"
            @click="deleteItemInFC(card)"
          >
            Удалить из избранного
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
    lastCard: null,
    usedСoordinates: [],
  }),
  props: {},
  methods: {
    ...mapActions("allCoctails", [
      "fetchListCoctails",
      "setScrollTop",
      "resetFavoriteInList",
    ]),
    ...mapActions("favorites", [
      "addItemInList",
      "resetLocalStorage",
      "deleteItemInList",
    ]),
    async scroll() {
      const valueScrollTop = this.$refs.dispalyList.scrollTop;
      this.setScrollTop(valueScrollTop);

      const dispalyList = this.$refs.dispalyList;
      if (
        dispalyList.scrollTop + dispalyList.clientHeight >=
        dispalyList.scrollHeight
      ) {
        await this.fetchListCoctails();
      }
    },
    addItemInFC(item) {
      this.addItemInList(item);
      this.resetLocalStorage();
      this.resetFavoriteInList({ id: item.id, value: true });
    },
    deleteItemInFC(item) {
      this.resetFavoriteInList({ id: Number(item.id), value: false });
      this.deleteItemInList(Number(item.id));
      this.resetLocalStorage();
    },
  },
  computed: {
    ...mapGetters("allCoctails", ["all_coctails_list", "scroll_top"]),
  },
  async mounted() {
    //установка скрола
    this.$refs.dispalyList.scrollTop = this.scroll_top;
    if (this.all_coctails_list.length !== 0) return;
    await this.fetchListCoctails();
    this.lastCard = this.$refs.card[this.$refs.card.length - 4];
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
  max-height: 370px
  &__img
    margin-bottom 10px
    img
      width 100%
      height 100%
      object-fit: contain
  &__name
    margin-bottom 10px
    font-size: 19px
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
