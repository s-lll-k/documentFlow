<script>
export default {
  layout: "login",
  data() {
    return {
      user: {},
      activeStep: 1,
      username: "admin",
      password: "12345678",
      loading: false,
    };
  },
  methods: {
    changeStepStatus() {
      this.activeStep = 2;
    },
    redirect() {
      this.$router.push("/news");
    },
    async handleSubmit() {
      this.loading = true;
      const postData = {
        username: this.username,
        password: this.password,
      };
      await this.$axios
        .post(`/api/auth/signin`, postData)
        .then((res) => {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...res.data,
              userRole: res.data.roles[0].name === "ROLE_USER" ? 2 : 1,
            })
          );
          this.$store.commit("SET_LOGGEDIN", true);
          this.$store.commit("SET_USER",
            {
              ...res.data,
              userRole: res.data.roles[0].name === "ROLE_USER" ? 2 : 1,
            });
          this.redirect();
        })
        .catch((err) => console.error(err))
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<template>
  <client-only>
    <main class="login">
      <loader v-if="loading" />
      <div class="login__welcome">
        <img src="@/assets/images/logo.png" />
        <LanguageSelector />
      </div>
      <h1 class="login__title" :class="{ title_margin: activeStep === 2 }">
        Документооборот
      </h1>
      <button
        v-if="activeStep === 1"
        @click="changeStepStatus"
        class="login__button"
      >
        Добро пожаловать!
      </button>
      <form v-else class="form" ref="form" @submit.prevent="handleSubmit">
        <label for="text">
          <input
            type="text"
            id="email"
            placeholder="Логин"
            v-model="username"
          />
        </label>
        <label for="password">
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Пароль"
          />
        </label>
        <button type="submit" class="form__button">Войти</button>
        <a class="forgot-password">Забыли парль?</a>
      </form>
    </main>
  </client-only>
</template>

<style lang="scss" scoped>
.login {
  max-width: 700px;
  margin: 0 auto;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__welcome {
    display: flex;
    padding-top: 78px;
    img {
      width: 231px;
      max-height: 133px;
      height: auto;
      object-fit: cover;
    }
  }
  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 70px;
    line-height: 85px;
    margin-bottom: 62px;
  }
  .title_margin {
    margin-bottom: 37px;
  }
  &__button {
    cursor: pointer;
    height: 100px;
    background: linear-gradient(180deg, #ffffff 41.67%, #e2dfdf 100%);
    border: 1.5px solid #0c0b0b;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    width: 300px;

    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 26px;
    color: #0c0b0b;
  }
}
.form {
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    max-width: 411px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 37px;

    &:last-of-type {
      margin-bottom: 29px;
    }
  }

  input {
    margin: 0 auto;
    outline: none;
    background: #ffffff;
    border: 1.5px solid #0c0b0b;
    border-radius: 8px;
    height: 50px;
    width: 100%;
    padding-left: 26px;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 26px;

    color: black;
  }

  &__button {
    max-width: 411px;
    width: 100%;
    height: 59px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(180deg, #ffffff 41.67%, #e2dfdf 100%);
    border: 1.5px solid #0c0b0b;
    border-radius: 8px;
    cursor: pointer;
  }
}
.forgot-password {
  margin-top: 37px;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-decoration: unset;
  color: #0c0b0b;
  cursor: pointer;
}
</style>
