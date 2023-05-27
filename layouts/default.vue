<script>
export default {
  middleware: ["auth"],
};
</script>

<template>
  <client-only>
    <main class="main">
      <div class="main__container">
        <NavBar />
        <InputSearch />
        <Nuxt />
      </div>
    </main>
  </client-only>
</template>

<style lang="scss" scoped>
.main {
  background: #ecebf3;
  min-height: 100vh;
  width: 100%;

  &__container {
    padding-top: 60px;
    margin: 0 auto;
    padding-left: 400px;
    padding-right: 55px;
    width: 100%;
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: unset;
}
button {
  cursor: pointer;
}
input {
  outline: none;
}
</style>
