<script>
export default {
  data() {
    return {
      show: false,
      user: {},
      showType: false,
      selectedApplicationType: null,
      categoryCode: null,
      description: "",
    };
  },
  async created() {

  },
  methods: {
    externalClick() {
      this.show = false;
      this.showType = false;
    },
    requestApplication() {
      this.selectedApplicationType
        ? (this.createApplication = true)
        : alert("Выберите тип заявки");
    },
    openReference(id) {
      this.$router.push({ path: "/reference", query: { referenceId: id } })
    },
    switchItemsVisibility() {
      this.show = !this.show;
    },
    filterApplications(sort) {
      this.applications.sort((a, b) => {
        return sort === "new"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      });
    },
  },

};
</script>

<template>
  <div>
    <!-- <nuxt-link class="твой класс" :to="'/faq'">
                        внутрянка как и у обычных блоков
                      </nuxt-link> -->
    <div class="settings">
      <h1 class="settings__title">
        Настройки
      </h1>

      <div class="settings__items">
        <div class="settings__item">
          FAQ
        </div>
        <div class="settings__item">
          <div class="filter">
            <p class="filter__title" @click="switchItemsVisibility" v-click-outside="externalClick">
              Фильтровать
              <svg :class="{ reveal: show, closed: !show }" width="14" height="8" viewBox="0 0 14 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </p>
            <div v-show="show" class="filter__items">
              <div class="filter__item" >
                По новым
              </div>
              <div class="line"></div>
              <div class="filter__item" >
                По старым
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    // line-height: 40px;
    color: #0c0b0b;
    margin-bottom: 34px;

    @media screen and (max-width:1200px) {
      font-size: 24px;
    }

    @media screen and (max-width:500px) {
      font-size: px;
    }
  }
}
</style>