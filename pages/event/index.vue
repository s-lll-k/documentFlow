<script>
import Swiper, { Navigation } from "swiper";
Swiper.use([, Navigation]);
export default {
    data() {
        return {
            event: null
        }
    },

    created() {
        this.event = this.$store.state.calendarEvent;

        console.log('this.event', this.event)
    }
};
</script>

<template>
  <div v-if="event">
    <div class="cards">
      <div class="cards__item event">
        <span>{{ event.eventsNum }}</span>
        <span>Запланированные <br> события</span>
      </div>
      <div class="cards__item weekend">
        <span>{{ event.weekendsNum }}</span>
        <span>Выходные</span>
      </div>
    </div>
    <div class="event">
      <div class="event__date">
        {{ event.month }}, {{ event.day }}
      </div>
      <div class="event__card">
        {{ event.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 85px;
  margin-bottom: 22px;

  &__item {
    max-width: 358px;
    width: 100%;
    height: 132px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);
    border-radius: 14px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0 60px;

    span {
      font-weight: 600;
      text-align: center;

      &:first-child {
        font-size: 28px;
      }

      &:last-child {
        font-size: 22px;
      }

      line-height: 29px;
      color: white;
    }

    &.weekend {
      background: #28DB7A;

    }

    &.event {
      background-color: #6688F9;
    }
  }
}
.calendar {
  margin: 0 auto;
  font-family: Arial, sans-serif;
  width: 300px;
}
.event {
    &__date {
        margin: 33px 0 52px;
        font-family: 'Segoe UI';
        font-style: normal;
        font-weight: 700;
        font-size: 34px;
        line-height: 45px;
        color: #0C0B0B;
        text-align: center;
    }
    &__card {
        background: #FFFFFF;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.32);
        border-radius: 14px;
        font-family: 'Segoe UI';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
        color: #0C0B0B;
        padding: 48px;
        text-align: center;
        margin-bottom: 100px;
    }
}
</style>