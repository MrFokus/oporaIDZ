<script setup lang="ts">
const userList = ref()
const registerList = ref()
onMounted(() => {
  userList.value = JSON.parse(localStorage.getItem('user-list'))
  registerList.value = JSON.parse(localStorage.getItem('list-register'))
  user.value = findUsr(+route.params.id)
})
const route = useRoute()
const user = ref()
const chapter = ref('info')
const me = useCookie('user')
console.log(route)

function findUsr(id: number) {
  if (userList.value.find(usr => usr.data.id === id)) {
    return {...userList.value.find(usr => usr.data.id === id), location: 'user-list'}
  } else if (registerList.value.find(usr => usr.data.id === id)) {
    return {...registerList.value.find(usr => usr.data.id === id), location: 'register-list'}
  } else return false
}

function successUser() {
  let copyLR = JSON.parse(localStorage.getItem('list-register'))
  let copyUL = JSON.parse(localStorage.getItem('user-list'))
  if (!copyUL) {
    copyUL = []
  }
  let index = copyLR.map(function (e) {
    return e.data.id;
  }).indexOf(user.value.data.id)
  console.log(index)
  if (index !== -1) {
    copyUL.push({...copyLR[index], about: ''})
    copyLR.splice(index, 1)
    localStorage.setItem('user-list', JSON.stringify(copyUL))
    localStorage.setItem('list-register', JSON.stringify(copyLR))
    user.value.location = 'user-list'
  }
}
</script>

<template>
  <div class="client">
    <header>
      <div class="container">
        <div class="title">
          <h1 v-if="user">{{user.data.organization?user.data.organization:`${user.data.lastName} ${user.data.firstName} ${user.data.patronymic}` }} </h1>
          <button v-if="user?.location !== 'register-list'">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
              <path d="M9.625 8.75H8.25V17H9.625V8.75Z" fill="#2962FF"/>
              <path d="M13.75 8.75H12.375V17H13.75V8.75Z" fill="#2962FF"/>
              <path
                  d="M2.75 4.625V6H4.125V19.75C4.125 20.1147 4.26987 20.4644 4.52773 20.7223C4.78559 20.9801 5.13533 21.125 5.5 21.125H16.5C16.8647 21.125 17.2144 20.9801 17.4723 20.7223C17.7301 20.4644 17.875 20.1147 17.875 19.75V6H19.25V4.625H2.75ZM5.5 19.75V6H16.5V19.75H5.5Z"
                  fill="#2962FF"/>
              <path d="M13.75 1.875H8.25V3.25H13.75V1.875Z" fill="#2962FF"/>
            </svg>
          </button>
        </div>
        <div v-if="user?.location === 'register-list'">
          <button @click="successUser" class="success">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
              <path
                  d="M6.09375 11.7497L1.875 7.53098L2.53781 6.86816L6.09375 10.4236L12.4622 4.05566L13.125 4.71848L6.09375 11.7497Z"
                  fill="#43A047"/>
            </svg>
          </button>
          <button class="denied">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
              <path
                  d="M11 4.1125L10.3875 3.5L7.5 6.3875L4.6125 3.5L4 4.1125L6.8875 7L4 9.8875L4.6125 10.5L7.5 7.6125L10.3875 10.5L11 9.8875L8.1125 7L11 4.1125Z"
                  fill="#E53935"/>
            </svg>
          </button>
        </div>
        <p v-else class="code-activation">
          Код активации: {{ user?.codeActivation }}
        </p>
      </div>
      <div class="user">
        <p class="username">{{ me?.name ?? '' }}</p>
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
    <nav>
      <button :class="[chapter==='info'?'active':'']" @click = "chapter = 'info'">Информация</button>
      <button :class="[chapter==='calendar'?'active':'']" @click = "chapter = 'calendar'">Календарь</button>
    </nav>
    <section class="content">
      <form v-if="chapter==='info'" class="info">
        <div class="user-data">
          <div v-if="user && !user.data.organization" class="people">
            <div class="params-select">
              <p>Фамилия</p>
              <input v-model="user.data.firstName"/>
            </div>
            <div class="params-select">
              <p>Имя</p>
              <input v-model="user.data.firstName"/>
            </div>
            <div class="params-select">
              <p>Отчество</p>
              <input v-model="user.data.firstName"/>
            </div>
          </div>
          <div v-else-if="user" class="company">
            <div class="params-select">
              <p>Организация</p>
              <input v-model="user.data.organization"/>
            </div>
          </div>
        </div>
        <div v-if="user" class="other-data">
          <div class="params-select">
            <p>Телефон</p>
            <input v-model="user.data.tel"/>
          </div>
          <div class="params-select">
            <p>Электронная почта</p>
            <input v-model="user.data.mail"/>
          </div>
          <div class="params-select">
            <p>ИНН</p>
            <input v-model="user.data.INN"/>
          </div>
        </div>
        <div v-if="user && 'about' in user " class="about params-select">
          <p>Заметки</p>
          <textarea v-model="user.about"></textarea>
        </div>
        <hr>
        <div class="btn-submit">
          <button class="blue">Сохранить изменении в профиле</button>
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
nav{
  gap: _rem(16);
  display: flex;
  button{
    text-align: start;
    color: #2C4652;
    font-family: Roboto, sans-serif;
    font-size: _rem(16);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
    width: _rem(192);
    padding:0 0 _rem(4) 0;
    &.active{
      border-bottom: 1px #2C4652 solid;
      padding:0 0 _rem(3) 0;
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
  .user{
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
      button{
        display: flex;
        margin-left: _rem(8);
        svg{
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
.info{
  margin-top: _rem(32);
}
form{
  display: flex;
  flex-direction: column;
  gap: _rem(32);
  width: 100%;
}
.company, .people, .other-data{
  gap: _rem(16);
}
.about{
  width: _rem(608);
  textarea{
    padding: _rem(16);
    border-radius: _rem(10);
    resize: none;
    font-size: _rem(16);
  }
}
.btn-submit{
  width: 100%;
  justify-content: flex-end;
  button{
    width: _rem(400);
  }
}

</style>