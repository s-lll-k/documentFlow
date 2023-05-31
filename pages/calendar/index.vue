<script>
import Swiper, { Navigation } from "swiper";
Swiper.use([, Navigation]);
export default {
  data() {
    return {
      monthTitle: '',
      daysOfWeek: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
      weeks: [],
      selectedDate: '2023-05-01',
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 500,
        transition: 5000,
        direction: "horizontal",
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: ".calendar__arrow.next",
          prevEl: ".calendar__arrow.prev",
        },
      }
    };
  },
  async created() {
    this.generateCalendar();
  },
  methods: {
    generateCalendar() {
      const date = new Date(this.selectedDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const numDays = lastDay.getDate();
      const startingDay = firstDay.getDay();
      
      const weeks = [];
      let dayCounter = 1;
      
      for (let i = 0; i < 6; i++) {
        const week = [];
        
        if (i === 0) {
          for (let j = 0; j < 7; j++) {
            if (j >= startingDay) {
              week.push(dayCounter);
              dayCounter++;
            } else {
              week.push(null);
            }
          }
        } else {
          for (let j = 0; j < 7; j++) {
            if (dayCounter <= numDays) {
              week.push(dayCounter);
              dayCounter++;
            } else {
              week.push(null);
            }
          }
        }
        
        weeks.push(week);
        if (dayCounter > numDays) {
          break;
        }
      }
      const monthName = date.toLocaleString('ru-RU', { month: 'long' });
      this.monthTitle = monthName.charAt(0).toUpperCase() + monthName.slice(1);
      this.weeks = weeks;
    }
  }
};
</script>

<template>
  <div>
    <div class="cards">
      <div class="cards__item event">
        <span>2</span>
        <span>Запланированные <br> события</span>
      </div>
      <div class="cards__item weekend">
        <span>8</span>
        <span>Выходные</span>
      </div>
    </div>
    <div class="navigation">
      <swiper ref="swiper" :options="swiperOptions" class="swiper">
        <swiper-slide v-for="item in 4" :key="item" class="swiper-slide">
          <div class="swiper-item">
            <div class="calendar">
              <h2>{{ monthTitle }}</h2>
              <table>
                <thead>
                  <tr>
                    <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(week, index) in weeks" :key="index">
                    <td v-for="(day, dayIndex) in week" :key="dayIndex" class="day-cell">{{ day }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="calendar__arrow prev" role="button" aria-label="button prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="24"
          height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div class="calendar__arrow next" role="button" aria-label="button next">
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L7 7L1 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  margin-bottom: 60px;
}
.navigation {
  position: relative;
}

.calendar__arrow {
  z-index: 1;
  position: absolute;
  top: 50%;
  width: 42px;
  height: 41px;
  border-radius: 50%;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
}

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
  font-family: Arial, sans-serif;
  width: 300px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
