<script>
export default {
  data() {
    return {
      createApplication: false,
      showPopup: false,
      loading: false,
      profileInfo: [
        { title: "IIТ студента", backendKey: "studIIN" },
        { title: "ID студента", backendKey: "userId" },
        { title: "Имя", backendKey: "firstname" },
        { title: "Фамилия", backendKey: "lastname" },
        { title: "Факультет", backendKey: "faculty" },
        { title: "Форма обучения", backendKey: "educationType" },
        { title: "Грант", backendKey: "studGrant" },
        { title: "Курс", backendKey: "cource" },
        { title: "Год поступления", backendKey: "yearAdm" },
        { title: "Год окончания", backendKey: "yearGrad" },
      ],
      applications: [],
      applicationTypes: [
        { title: "Транскрипт" },
        { title: "Справка с места учебы" },
        { title: "Справка о наличии гранта" },
        { title: "Лист перезачета кредитов" },
      ],
      show: false,
      user: {},
      showType: false,
      selectedApplicationType: null,
      categoryCode: null,
      description: "",
    };
  },
  async created() {
    this.getApplicationTypes();
    const config = {
      params: {
        status: 'NEW',
      },
      headers: {
        Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
      },
    };
    await this.$axios
      .get(`/api/users/me`, config)
      .then((res) => (this.user = res.data))
      .catch((err) => console.error(err));
    await this.$axios
      .get(`/api/doc/all`, config)
      .then((res) => this.applications = [...res.data])
      .catch((err) => {console.error(err)});
  },
  methods: {
    async getApplicationTypes() {
      const types = await this.$axios.get(`api/doc_categories`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
        },
      });
      this.applicationTypes = types.data.map((item) => {
        return {
          title: item.name,
          code: item.code,
        };
      });
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
    searchApplications(val) {
      // TODO: серч по айди заявки
    },
    selectApplicationType(v, i) {
      this.categoryCode = v.code;
      this.selectedApplicationType = v.title;
    },
    openApplicationTypes() {
      this.showType = !this.showType;
    },
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
      this.$router.push({path: "/reference", query: {referenceId: id}})
    },
    async openPopup() {
      await this.$axios
        .post(
          "/api/doc",
          {
            category: this.categoryCode,
            id: this.$store.getters.GET_USER.id,
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.GET_USER.token}`,
            },
          }
        )
        .then((res) => {
          this.showPopup = true;
        })
        .catch((err) => console.error(err))
        .finally(() => {});
    },
    closePopup() {
      this.description = "";
      this.categoryCode = null;
      this.showPopup = false;
      this.createApplication = false;
      this.selectedApplicationType = null;
    },
  },
};
</script>

<template>
  <div class="applications">
    <div
      v-if="$store.getters.GET_USER.userRole === 1"
      class="applications__block"
    >
      <div class="applications__filter">
        <h2 class="applications__title">Новые заявки</h2>
        <div class="search">
          <div class="filter">
            <p
              class="filter__title"
              @click="switchItemsVisibility"
              v-click-outside="externalClick"
            >
              Фильтровать
              <svg
                :class="{ reveal: show, closed: !show }"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </p>
            <div v-show="show" class="filter__items">
              <div class="filter__item" @click="filterApplications('new')">
                По новым
              </div>
              <div class="line"></div>
              <div class="filter__item" @click="filterApplications('old')">
                По старым
              </div>
            </div>
          </div>
          <SearchComponent @searchItems="searchApplications" width="195px" />
        </div>
      </div>
      <div class="applications__items">
        <div
          v-for="item in applications"
          :key="item.id"
          class="applications__item"
          @click="openReference(item.id)"
        >
          <p>
            {{ item.createdAt.split('T')[0] }}
          </p>
          <div>
            <span>
              {{ item.id }}
            </span>
            <h6>{{ item.category }}</h6>
          </div>
          <span>{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.applications {
  display: flex;
  padding-bottom: 50px;
  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 1048px;
  }

  &__filter {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &__title {
    width: 100%;
    text-align: left;
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 45px;
    color: #0c0b0b;
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 75px;
    width: 100%;
  }
  &__item {
    cursor: pointer;
    max-width: 784px;
    width: 100%;
    background: white;
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);

    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 14px 23px 30px 52px;

    margin-bottom: 47px;

    p {
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      color: #0c0b0b;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        margin-bottom: 14px;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 27px;
        color: #0c0b0b;
      }
      h6 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #0c0b0b;
      }
    }

    span {
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #939393;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
  &__button {
    width: 295px;
    height: 59px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #0c0b0b;
    background: linear-gradient(180deg, #ffffff 43.75%, #e2dfdf 100%);
    border: 1.5px solid #0c0b0b;
    border-radius: 8px;
    cursor: pointer;
  }
  &__student {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__step1 {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
.search {
  display: flex;
  align-items: center;
}

.filter {
  display: flex;
  flex-direction: column;

  margin-right: 44px;

  position: relative;

  &__title {
    cursor: pointer;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.408px;
    color: #000000;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: flex;
    align-items: center;
  }

  svg {
    margin-left: 3px;
  }
  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;

    max-width: 150px;
    background: white;
    border-radius: 6px;
    padding: 14px 6px;

    position: absolute;
    top: 100%;
    left: 8%;
  }
  &__item {
    cursor: pointer;
    margin-bottom: 6px;
    &:last-of-type {
      margin-top: 6px;
      margin-bottom: 0;
    }
  }
}
.line {
  width: 100%;
  border-bottom: 1px solid black;
}
.selector {
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 433px;
  width: 100%;
  border-radius: 8px;
  margin: 64px 0 78px;

  &__selected {
    cursor: pointer;
    width: 433px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #ffffff 41.67%, #e2dfdf 100%);
    border: 1.5px solid #0c0b0b;
    border-radius: 8px;
    padding: 11px 0;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 40px;
    color: #0c0b0b;

    svg {
      margin-left: 8px;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: white;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 23px 28px 17px;
  }
  &__item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
    padding: 10px 0;
    width: 100%;

    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 40px;
    color: #0c0b0b;

    &:last-of-type {
      border-bottom: unset;
    }
  }
}
.reveal {
  transform: rotate(-180deg);
  animation-name: reveal;
  animation-duration: 0.4s;
  @keyframes reveal {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-180deg);
    }
  }
  path {
    fill: gray;
  }
}
.closed {
  animation-name: closed;
  animation-duration: 0.4s;
  @keyframes closed {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__items {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    justify-content: space-between;
    grid-gap: 20px;

    margin-top: 68px;
  }

  &__item {
    display: flex;
    align-items: center;

    p {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: #0c0b0b;
    }

    span {
      font-weight: 400;
      font-size: 21px;
      margin-left: 8px;
      line-height: 25px;
    }
  }
  &__commentaries {
    display: flex;
    flex-direction: column;
    width: 100%;

    margin-top: 46px;

    h3 {
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;

      color: #060606;
    }
    textarea {
      margin-top: 16px;
      width: 100%;
      border-radius: 6px;
      height: 61px;
      padding: 10px 12px;
      outline: unset;
    }
  }
  &__button {
    width: 100%;

    margin-top: 100px;
    width: 260px;
    height: 60px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    cursor: pointer;
    color: #0c0b0b;
    text-align: center;
  }
}
.popup {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;

    max-width: 400px;
    width: 100%;
    border-radius: 4px;
    padding: 29px 16px;

    h4 {
      font-style: normal;
      font-weight: 600;
      font-size: 26px;
      line-height: 35px;
      text-align: center;
      color: #0c0b0b;
    }

    button {
      background: linear-gradient(180deg, #ffffff 43.75%, #e2dfdf 100%);
      border: 1.5px solid #0c0b0b;
      border-radius: 8px;
      margin-top: 40px;
      width: 90px;
      height: 41px;
      cursor: pointer;
    }
  }
}
</style>
