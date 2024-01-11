<script setup lang="ts">
const props = defineProps<{
  events:any[]
}>()
const days = ref([])
const listMonth = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']
const Months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']

const month =ref(new Date().getMonth())
const year = ref(new Date().getFullYear())
function calcDays(){
  let day = new Date(year.value, month.value, 1).getDay()
  day = -day+2
  for (let i = 0; i < 5; i++) {
    days.value.push([])
    for (let j = 0; j < 7; j++) {
      days.value[i].push({date:new Date(year.value,month.value,day),events:[]})
      day++
    }
  }
}
function searchEvent(date:Date){
  if (props.events)
  console.log(new Date(props?.events[1].date),date)
  return props?.events?.filter(e=>new Date(e.date).getTime()===date.getTime())
}
calcDays()
function slideDate(val:number){
  month.value+=val
  days.value = []
  calcDays()
}
</script>

<template>
  <nav style="margin-bottom: 20px; display: flex; align-items: center;justify-content: center;gap: 10px; width: fit-content"><button @click="slideDate(-1)"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M6.875 11L13.75 4.125L14.7125 5.0875L8.8 11L14.7125 16.9125L13.75 17.875L6.875 11Z" fill="#909CA2"/>
  </svg></button><span style="padding-bottom: 2px; font-size: 16px; font-weight: 500">{{Months[new Date(year, month, 1).getMonth()]}} {{new Date(year, month, 1).getFullYear()}}</span><button @click="slideDate(1)"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M15.1251 11L8.2501 17.875L7.2876 16.9125L13.2001 11L7.2876 5.0875L8.2501 4.125L15.1251 11Z" fill="#909CA2"/>
  </svg></button></nav>
<table>
  <thead>
    <tr>
      <th>Пн</th>
      <th>Вт</th>
      <th>Ср</th>
      <th>Чт</th>
      <th>Пт</th>
      <th>Сб</th>
      <th>Вс</th>
    </tr>
  </thead>
  <tbody>
  <tr v-for="week in days">
    <td v-for="day in week">
      <div class="container">
        <header>
          {{`${day.date.getDate()} ${listMonth[day.date.getMonth()]}`}}
        </header>
        <div class="events">
          <div v-for="event in searchEvent(day.date)" class="event">
            <span class="time">{{event.time}}</span> <p class="description">{{event.description}}</p>
          </div>
        </div>
      </div>
    </td>
  </tr>
  </tbody>
</table>
</template>

<style scoped lang="scss">
table{
  width: 100%;
  height: 100%;
  th,td{
    background: white;
  }
  th, tr header{
    padding: _rem(10);
    color: var(--primary-colors-secondary, #909CA2);

    /* Text small regular */
    font-family: Roboto,sans-serif;
    font-size: _rem(16);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
  }
  td{
    max-width: _rem(174);
    width:_rem(174);
    height: _rem(166);
    .container{
      max-width: _rem(174);
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: flex-start;
    }
    header{
      background: var(--bg-page, #F0F0F0);
    }
    .events{
      width: 100%;
      height: 100%;
      max-height: 100%;
      flex-direction: column;
      .event{
        width: 100%;
        height: 100%;
        padding: _rem(10) _rem(16);
        align-items: center;
        justify-content: center;
        gap: _rem(10);
        .time{
          color: var(--primary-colors-secondary, #909CA2);

          /* Text x small regular */
          font-family: Roboto,sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 115%; /* 16.1px */
        }
        .description{
          overflow: hidden;
          color: var(--primary-colors-primary, #2C4652);
          text-overflow: ellipsis;
          white-space: nowrap;

          /* Text x small regular */
          font-family: Roboto,sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 115%; /* 16.1px */
        }
      }
    }
  }
}
</style>