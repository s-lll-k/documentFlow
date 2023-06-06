<script>
import Swiper, { Navigation } from "swiper";
Swiper.use([, Navigation]);
import moment from "moment";
export default {
  data() {
    return {
      token: "",
      moment: moment,
      swiperOptions: {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 500,
        transition: 5000,
        direction: "horizontal",
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      news: [],
      filteredNews: []
    };
  },
  async created() {
    await this.$axios
      .get("api/news", {
        headers: {
          Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
        },
      })
      .then((res) => {
        this.news = res.data;
        this.filteredNews = this.news;
      })
      .catch((err) => console.error(err));
  },
  methods: {
    searchNews(val) {
      if (val.trim()) {
        this.filteredNews = this.news.filter(n => {
          return String(n.theme).includes(val) || String(n.text).includes(val)
        });
      } else {
        this.filteredNews = this.news;
      }
    },
  }
};
</script>

<template>
  <div>
    <div class="navigation">
      <div class="swiper-button-prev prev-btn"></div>
      <swiper ref="swiper" :options="swiperOptions" class="swiper">
        <swiper-slide v-for="item in 4" :key="item" class="swiper-slide">
          <div class="swiper-item">
            <img src="@/assets/images/universities.png" />
            <p>Справка с места учебы</p>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next next-btn"></div>
    </div>
    <div class="news">
      <div class="news__wrapper">
        <h1 class="news__title">Новости</h1>
        <SearchComponent class="news__search" @searchItems="searchNews" />
      </div>
      <div class="news__items">
        <div class="news__item" v-for="(item, index) in filteredNews" :key="index">
          <h3>{{ item.theme }}</h3>
          <div class="news__item-wrapper">
            <span>{{ moment(item.createdAt).locale("ru").format("L") }}</span>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
}
.swiper-item {
  max-width: 325px;
  width: 100%;
  height: 193px;
  border-radius: 8px;
  background: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    color: #0c0b0b;
    margin-top: 18px;
  }
}

.news {
  padding-bottom: 50px;
  &__search {
    width: 250px;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    color: #0c0b0b;

    margin-bottom: 34px;
  }

  &__items {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  &__item {
    width: 100%;
    border-bottom: 1px solid black;
    padding-bottom: 18px;
    margin-bottom: 18px;
    & + & {
      margin-top: 30px;
    }
    &-wrapper {
      display: flex;
      align-items: center;
    }
    h3 {
      font-size: 24px;
      margin-bottom: 15px;
    }
    span,
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      color: #0c0b0b;
    }

    span {
      margin-right: 59px;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.navigation {
  display: flex;
  align-items: center;
  margin-bottom: 56px;

  // position: relative;

  .prev-btn,
  .next-btn,
  .swiper-button-prev,
  .swiper-button-next {
    position: static;

    background: white;
    border-radius: 50%;
    width: 42px;
    height: 41px;
  }
  .swiper-button-prev {
    margin-right: 30px;
  }
  .swiper-button-next {
    margin-left: 30px;
  }
  .swiper-button-next:after,
  .swiper-container-rtl .swiper-button-prev:after,
  .swiper-button-prev:after,
  .swiper-container-rtl .swiper-button-prev:after {
    width: 42px;
    height: 42px;
    display: flex;
    font-size: 15px;
    color: black !important;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
}
</style>
