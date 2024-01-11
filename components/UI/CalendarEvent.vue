<script setup lang="ts">
const props = defineProps<{
  events:any[]
}>()
const days = ref([])
const listMonth = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']
function calcDays(){
  let month = new Date().getMonth()
  let year = new Date().getFullYear()
  console.log(year)
  let day = new Date(year, month, 1).getDay()
  console.log(day)
  day = -day+2
  for (let i = 0; i < 5; i++) {
    days.value.push([])
    for (let j = 0; j < 7; j++) {
      days.value[i].push({date:new Date(year,month,day),events:[]})
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
</script>

<template>
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