<script>
export default {
  data() {
    return {

    };
  },
  async created() {

  },
  methods: {

  },
};
</script>

<template>
  <div>
    <div class="faq">
      <h1 class="faq__title">
        Часто задаваемые вопросы
      </h1>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.faq {
  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    // line-height: 40px;
    color: #0c0b0b;
    margin-bottom: 34px;
    text-align: center;
    margin-bottom: 150px;

    @media screen and (max-width:1200px) {
      font-size: 24px;
      margin-bottom: 120px;
    }

    @media screen and (max-width:500px) {
      font-size: 20px;
      margin-bottom: 70px;
    }
  }
}
</style>