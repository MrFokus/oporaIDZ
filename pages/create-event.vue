<script setup lang="ts">
import Select from "~/components/UI/Select.vue";

const event = ref({
  date: '',
  time: '',
  type: '',
  description: '',
  users:[]
})
const router = useRouter()
function createEvent(){
  for(const key in event.value){
    if (!event.value[key]){
      return
    }
  }
  let events = JSON.parse(localStorage.getItem('events'))
  if (!events){
    events = []
  }
  let copyDate =event.value.date.split('.')
  event.value.date = new Date(+copyDate[2],+copyDate[1]-1,+copyDate[0]).toString()
  events.push(event.value)
  localStorage.setItem('events',JSON.stringify(events))
  router.push('/calendar')
}
</script>

<template>
  <div class="client">
    <header>
      <div class="container">
        <div class="title">
          <h1>Создать мероприятие </h1>
        </div>
      </div>
    </header>
    <section class="content">
      <form @submit.prevent class="info">
        <div class="user-data">
          <div class="people">
            <div class="params-select">
              <p>Дата</p>
              <input v-model="event.date" placeholder="00.00.0000"/>
            </div>
            <div class="params-select">
              <p>Время</p>
              <input v-model="event.time" placeholder="00:00"/>
            </div>
            <div class="params-select">
              <p>Тип</p>
              <Select v-model="event.type" :list-select="['Открытое', 'Закрытое']"/>
            </div>
          </div>
        </div>
          <div class="about params-select">
            <p>Заметки</p>
            <textarea v-model="event.description"></textarea>
          </div>
          <hr>
          <div class="btn-submit">
            <button @click="createEvent" class="blue">Создать мероприятие</button>
          </div>
      </form>
    </section>
  </div>
</template>

<style scoped lang="scss">
.client {
  flex-direction: column;
  min-width: 100%;
}

nav {
  gap: _rem(16);
  display: flex;

  button {
    text-align: start;
    color: #2C4652;
    font-family: Roboto, sans-serif;
    font-size: _rem(16);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
    width: _rem(192);
    padding: 0 0 _rem(4) 0;

    &.active {
      border-bottom: 1px #2C4652 solid;
      padding: 0 0 _rem(3) 0;
    }
  }
}

header {
  position: sticky;
  top: 0;
  height: fit-content;
  justify-content: space-between;
  width: 100%;
  padding: _rem(32) 0;
  background-color: #EDEDF6;
  z-index: 3;

  .user {
    gap: _rem(8);
    align-items: center;
  }

  h1 {
    color: var(--primary-colors-primary, #2C4652);
    font-size: _rem(18);
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
  }

  .container {
    width: fit-content;
    gap: _rem(5);
    align-items: center;

    .title {
      margin-right: _rem(34);
      align-items: center;

      button {
        display: flex;
        margin-left: _rem(8);

        svg {
          width: auto;
          height: 100%;
        }
      }
    }

    button {
      display: flex;
      width: _rem(30);
      height: _rem(30);
      justify-content: center;
      align-items: center;
      border-radius: _rem(5);
      margin-right: _rem(10);

      svg {
        width: _rem(15);
        height: _rem(15);
        aspect-ratio: 1/1;
      }
    }

    .success {
      border: 1px solid var(--success-2, #CBEDCC);
      background: var(--success-2, #CBEDCC);
    }

    .denied {
      background: var(--critical-2, #FFC9C8);
    }
  }
}

.params-select {
  flex-direction: column;
  gap: _rem(8);
  width: _rem(296);
}

.info {
  margin-top: _rem(32);
}

form {
  display: flex;
  flex-direction: column;
  gap: _rem(32);
  width: 100%;
}

.company, .people, .other-data {
  gap: _rem(16);
}

.about {
  width: _rem(608);

  textarea {
    padding: _rem(16);
    border-radius: _rem(10);
    resize: none;
    font-size: _rem(16);
  }
}

.btn-submit {
  width: 100%;
  justify-content: flex-end;

  button {
    width: _rem(400);
  }
}

</style>