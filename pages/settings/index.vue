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
        <nuxt-link class="settings__item" :to="'/faq'">
          FAQ
        </nuxt-link>
        <div class="settings__item " @click="switchItemsVisibility" v-click-outside="externalClick">

          Фильтровать
          <svg :class="{ reveal: show, closed: !show }" width="14" height="8" viewBox="0 0 14 8" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div v-show="show" class="filter__items">
            <div class="filter__item">
              По новым
            </div>
            <div class="line"></div>
            <div class="filter__item">
              По старым
            </div>
          </div>

        </div>
      </div>

      <div class="settings__socials">
        <h2 class="settings__socials-title">Контакты</h2>
        <ul class="settings__socials-block">
          <li class="settings__socials-link"><a href="reception@iitu.edu.kz" target="_blank"
              class="settings__socials-link">
              <img src="../../assets/images/gmail.svg" alt="gmail" class="settings__socials-img">
            </a></li>
          <li class="settings__socials-link"><a href="https://www.instagram.com/iitu_kz/" target="_blank"
              class="settings__socials-link">
              <img src="../../assets/images/inst.svg" alt="inst" class="settings__socials-img">
            </a></li>
          <li class="settings__socials-link"><a href="https://vk.com/iitu_edu_kz" target="_blank"
              class="settings__socials-link">
              <img src="../../assets/images/vkontakte.svg" alt="vkontakte" class="settings__socials-img">
            </a></li>
          <li class="settings__socials-link"><a href="https://t.me/iitunews" target="_blank"
              class="settings__socials-link">
              <img src="../../assets/images/telegram.svg" alt="telegram" class="settings__socials-img">
            </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 700px;
  height: auto;

  @media screen and (max-width:1200px) {
    font-size: 24px;
  }

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
      font-size: 20px;
    }
  }

  &__socials {
    border-top: 1px solid rgba(18, 18, 29, 0.1);
    padding: 20px 0;
    justify-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: auto;

    &-block {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 20px;
    }

    &-title {
      font-family: 'Segoe UI';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      // line-height: 32px;

      margin-bottom: 15px;
      color: #0C0B0B;
    }
  }

  &__items {
    display: flex;
    justify-content: space-evenly;

    @media screen and (max-width:680px) {
      flex-direction: column;
      gap: 20px 0;
    }
  }

  &__item {
    max-width: 253px;
    width: 100%;
    height: 74px;
    background: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);
    border-radius: 14px;

    text-decoration: none;
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    // line-height: 32px;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #0C0B0B;

    @media screen and (max-width:680px) {
      max-width: 100%;
    }
  }
}
</style>