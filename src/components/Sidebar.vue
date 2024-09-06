<template>
  <div class="sidebar">
    <div class="select__container">
      <select class="select__category" v-model="select">
        <option class="select__option">Поиск по названию</option>
        <option class="select__option">Поиск по ингредиенту</option>
      </select>
      <img src="../assets/arrow-down-svgrepo-com.svg" alt="" />
    </div>
    <div class="search__container">
      <input
        type="text"
        placeholder="Введите запрос"
        v-model="search"
        @keyup.enter="searchCocktail"
        :class="{ 'input-color-red': emptyInput }"
        @click="clickInput"
      />
      <button @click="searchCocktail">
        <img src="../assets/search-magnifying-glass-svgrepo-com.svg" alt="" />
      </button>
    </div>
    <div class="buttons__container d-flex">
      <router-link
        class="button-grey border-left btn-all-coctail"
        :to="{ name: 'display' }"
        >Все коктейли
      </router-link>
      <router-link
        class="button-grey border-right btn-favorites"
        :to="{ name: 'displayFavorite' }"
        >Избранное
      </router-link>
    </div>
    <div class="dictionary">
      Словарь мер велечин:
      <ul>
        <li>qt - quartus - 1 кварта ~ 0.95л</li>
        <li>oz - 1 жидкая унция ~ 30мл</li>
        <li>cl - 1 сантилитр - 10мл</li>
        <li>tblsp - столовая ложка</li>
        <li>tsp - чайная ложка</li>
        <li>cups - чашки</li>
        <li>shot - шот - рюмка</li>
        <li>1 part - 1 часть ~ 30мл</li>
        <li>wedge - ломтик</li>
        <li>L - литр</li>
        <li>gr - грамм</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  data: () => ({
    select: 'Поиск по названию',
    search: '',
    emptyInput: false,
  }),
  methods: {
    ...mapActions('searchByCategory', [
      'fetchCoctailsByName',
      'fetchCoctailsByIngredient',
    ]),

    async searchCocktail() {
      if (this.search === '') {
        this.emptyInput = true;
        return;
      }
      if (this.categorySearch === 'name') {
        await this.fetchCoctailsByName(this.search);
        this.$router.replace({
          name: 'displayByCategory',
          params: {
            nameCategory: encodeURIComponent(this.categorySearch),
            search: encodeURIComponent(this.search),
          },
        }).catch(() => {});
      }
      if (this.categorySearch === 'ingredient') {
        await this.fetchCoctailsByIngredient(this.search);
        this.$router.replace({
          name: 'displayByCategory',
          params: {
            nameCategory: encodeURIComponent(this.categorySearch),
            search: encodeURIComponent(this.search),
          },
        }).catch(() => {});
      }
    },
    clickInput() {
      this.emptyInput = false;
    },
  },
  computed: {
    categorySearch() {
      if (this.select === 'Поиск по названию') return 'name';
      if (this.select === 'Поиск по ингредиенту') return 'ingredient';
    },
  },
  watch: {
    search: function (val) {
      this.emptyInput = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
a
  display block

.sidebar
  background-color #222
  border 1px solid #333
  border-radius: 10px
  padding 20px 30px
  margin-right 20px

.select
  &__container
    margin-bottom 20px
    position relative
    img
      position: absolute
      right 10px
      top 8px
      cursor pointer
  &__category
    outline: none
    background-color: #3a3a3a
    color white
    font-size 16px
    padding 12px
    border: none
    border-radius: 10px
    appearance none
    position: relative;
    width: 100%;
    cursor pointer
  &__option
    font-size: 17px







.search
  &__container
    display flex
    align-items center
    margin-bottom 20px
    width fit-content
    input
      outline: none
      background-color #3a3a3a
      border none
      font-size 16px
      padding 12px
      color white
      border-radius: 10px 0px 0px 10px
    button
      background-color: #a631cd
      border none
      border-radius: 0px 10px 10px 0px
      padding: 9.5px 11px;
      cursor pointer
      img
        width 20px


.btn-all-coctail
  margin-right 5px

.dictionary
  line-height 2
  background-color: #3a3a3a;
  padding: 10px;
  border-radius: 10px;
  opacity: 1;
  margin-top: 20px

.input-color-red::placeholder
  color #ed4949
</style>
