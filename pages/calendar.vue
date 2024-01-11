<script setup lang="ts">

import CalendarEvent from "~/components/UI/CalendarEvent.vue";
const events = ref()
onMounted(()=>{
  events.value = JSON.parse(localStorage.getItem('events'))
})
const user = useCookie('user')
</script>

<template>
  <section class="calendar-page">
    <header>
      <h1>Опора</h1>
      <div class="user">
        <p class="username">{{user?.name??''}}</p>
        <button class="logout">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" fill="white" style="mix-blend-mode:multiply"/>
            <path
                d="M4.5 22.5H13.5C13.8977 22.4995 14.279 22.3414 14.5602 22.0602C14.8414 21.7789 14.9995 21.3977 15 21V18.75H13.5V21H4.5V3H13.5V5.25H15V3C14.9995 2.60232 14.8414 2.22105 14.5602 1.93984C14.279 1.65864 13.8977 1.50046 13.5 1.5H4.5C4.10232 1.50046 3.72105 1.65864 3.43984 1.93984C3.15864 2.22105 3.00046 2.60232 3 3V21C3.00046 21.3977 3.15864 21.7789 3.43984 22.0602C3.72105 22.3414 4.10232 22.4995 4.5 22.5Z"
                fill="#2962FF"/>
            <path
                d="M15.4395 15.4395L18.129 12.75H7.5V11.25H18.129L15.4395 8.5605L16.5 7.5L21 12L16.5 16.5L15.4395 15.4395Z"
                fill="#2962FF"/>
          </svg>
        </button>
      </div>
    </header>
    <CalendarEvent :events="events"/>
  </section>
</template>

<style scoped lang="scss">
header{
  position: sticky;
  top: 0;
  height: fit-content;
  justify-content: space-between;
  width: 100%;
  padding: _rem(32) 0;
  background-color: #EDEDF6;
  h1{
    color: var(--primary-colors-primary, #2C4652);
    font-size: _rem(18);
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
  }
}
.calendar-page{
  width: 100%;
  flex-direction: column;
}
</style>