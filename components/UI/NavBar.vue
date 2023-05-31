<template>
  <div class="navbar">
    <div class="navbar__top">
      <div class="navbar__burger">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="navbar__person person">
      <div class="person__content">
        <img src="@/assets/images/user-icon.png" />
        {{ user.username }}
      </div>
    </div>
    <div class="navbar__items">
      <div
        v-for="(item, index) in navbarList"
        :key="item.title + index"
        class="navbar__item"
        :class="{ active: $route.path === item.url }"
      >
        <nuxt-link :to="item.url">
          <img :src="item.icon" />
          <span>{{ item.title }}</span>
        </nuxt-link>
      </div>
      <a @click="logout" class="logout">
        Выйти
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.00033 1.33334H12.0003C12.7337 1.33334 13.3337 1.93334 13.3337 2.66667V13.3333C13.3337 14.0667 12.7337 14.6667 12.0003 14.6667H6.00033C5.26699 14.6667 4.66699 14.0667 4.66699 13.3333V12H6.00033V13.3333H12.0003V2.66667H6.00033V4H4.66699V2.66667C4.66699 1.93334 5.26699 1.33334 6.00033 1.33334Z"
            fill="#0C0B0B"
          />
          <path
            d="M6.72667 10.3933L7.66667 11.3333L11 8L7.66667 4.66667L6.72667 5.60667L8.44667 7.33334H2V8.66667H8.44667L6.72667 10.3933Z"
            fill="#0C0B0B"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      //   selectedCategory: 0,
      navbarList: [
        {
          title: "Новости",
          icon: require("@/assets/images/updates.png"),
          url: "/news",
        },
        {
          title: "Заявки",
          icon: require("@/assets/images/applications.png"),
          url: "/applications",
        },
        {
          title: "Архив заявок",
          icon: require("@/assets/images/archive.png"),
          url: "/archieve",
        },
        {
          title: "Профиль",
          icon: require("@/assets/images/profile.png"),
          url: "/profile",
        },
        {
          title: "Календарь",
          icon: require("@/assets/images/calendar.png"),
          url: "/calendar",
        }
      ],
    };
  },
  created() {
    this.user = this.$store.getters.GET_USER;
    // console.log(this.$route.path);
  },
  methods: {
    logout() {
      this.$store.commit("SET_LOGGEDIN", false);
      this.$store.commit("SET_USER", {});
      this.$router.push({ path: "/login" });
    },
    // selectCategory(i) {
    //   this.selectedCategory = i;
    // },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  background: rgb(248, 249, 250);
  max-width: 337px;
  width: 100%;
  height: 100vh;
  overflow: auto;
  padding-bottom: 50px;
  &__burger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 37px;
    height: 60px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    div {
      cursor: pointer;
      width: 30px;
      height: 4px;
      margin-bottom: 3px;
      background: black;
      border-radius: 3px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  &__person {
    padding: 43px 0;
  }
  &__items {
    display: flex;
    flex-direction: column;
  }
  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    cursor: pointer;

    a {
      display: flex;
      align-items: center;
      text-decoration: unset;

      text-align: left;
      height: 100%;
      margin-left: 10px;
      width: 100%;
      padding: 10px 0 10px 50px;
      cursor: pointer;
      span {
        margin-left: 12px;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #0c0b0b;
      }
    }
    &:hover {
      background: #ecebf3;
      transition: 0.22s;
    }
    img {
      object-fit: cover;
    }
  }
  .active {
    background: #ecebf3;
    transition: 0.22s;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
}
.person {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: "Segoe UI";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;

    img {
      height: 4vw;
      width: 4.5vw;
      margin-bottom: 20px;
    }
  }
}
.logout {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 24px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #0c0b0b;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  svg {
    margin-top: 4px;
  }
}
</style>
