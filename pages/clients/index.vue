<script setup lang="ts">
import Select from "~/components/UI/Select.vue";

const userList = ref([])
const user = useCookie('user')
onMounted(() => {
  userList.value = JSON.parse(localStorage.getItem('user-list'))
})
const search = ref({
  type: '',
  name: '',
  INN: '',
})

function searchUser() {
  userList.value.filter(user => {

    if ((user.data.organization === search.value.INN || `${user.data.lastName} ${user.data.firstName} ${user.data.patronymic}` == search.value.INN) && user.data.type === search.value.type && user.data.INN === search.value.INN)
    {
      console.log('sfvscvscv')
      return user
    }

  })
  console.log(userList.value)

}

</script>

<template>
  <div class="client-page">
    <header>
      <h1>Клиенты</h1>
      <div class="user">
        <p class="username">{{ user?.name ?? '' }}</p>
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
    <div class="content">
      <div class="search">
        <div class="inputs">
          <div class="params-select type">
            <p>Категория</p>
            <Select v-model="search.type" placeholder="Выберите категорию"
                    :list-select="['ИП','Физическое лицо','Организация']"></Select>
          </div>
          <div class="params-select">
            <p>ФИО/Компания</p>
            <input v-model="search.name" placeholder="Ваше имя"/>
          </div>
          <div class="params-select">
            <p>ИНН*</p>
            <input v-model="search.INN" placeholder="__ __ ______ __">
          </div>
        </div>
        <hr>
        <div class="btn-container">
          <button @click="searchUser" class="search-btn blue">Поиск</button>
          <button class="default white">Сброс</button>
        </div>
      </div>
      <table>
        <thead>
        <tr>
          <th>
            ФИО или организация
          </th>
          <th>
            Телефон
          </th>
          <th>
            Элетронная почта
          </th>
          <th>
            ИНН
          </th>
        </tr>
        </thead>
        <tbody v-if="userList">
        <tr v-for="(user,index) in userList">
          <td class="name">
            <nuxt-link :to="'/clients/'+user.data.id">
              {{
                user.data.organization ? user.data.organization : `${user.data.lastName} ${user.data.firstName} ${user.data.patronymic}`
              }}
            </nuxt-link>
          </td>
          <td class="tel">{{ user.data.tel }}</td>
          <td class="mail">{{ user.data.mail }}</td>
          <td class="INN">{{ user.data.INN }}</td>
        </tr>
        </tbody>

      </table>
    </div>

  </div>
</template>

<style scoped lang="scss">
hr {
  padding: 0;
  height: 0;
  border: none;
  border-top: 1px solid #B4C0C5;
  margin: _rem(32) 0;
}

.client-page {
  flex-direction: column;
  min-width: 100%;
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

  h1 {
    color: var(--primary-colors-primary, #2C4652);
    font-size: _rem(18);
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
  }
}

.user {
  gap: _rem(8);
}

.content {
  flex-direction: column;
  gap: _rem(32);
}

.search {
  flex-direction: column;
  width: _rem(608);

  .inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: _rem(16);
    row-gap: _rem(32);

    .params-select {
      p {
        color: #909CA2;

      }

      flex-direction: column;
      gap: _rem(8);
      width: _rem(296);
    }

    .type {
      grid-column: span 2;
    }
  }

  .btn-container {
    justify-content: end;
    gap: _rem(16);

    button {
      width: _rem(192);
    }
  }
}


table {
  max-width: 100%;
  width: 100%;

  td, th {
    background: white;
    padding: _rem(10) _rem(18);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  th {
    color: var(--primary-colors-secondary, #909CA2);
    font-size: _rem(16);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
  }

  td {
    color: var(--primary-colors-primary, #2C4652);
    font-size: _rem(16);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
    max-width: _rem(270);
  }

  .action {
    min-width: _rem(104);
    width: fit-content;

    .container {
      width: fit-content;
      gap: _rem(5);
      margin: auto;
    }

    button {
      display: flex;
      width: _rem(30);
      height: _rem(30);
      justify-content: center;
      align-items: center;
      border-radius: _rem(5);

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

  .name {
    max-width: _rem(308);

    a {
      color: var(--buttons-bg-hovered, #01579B);
      font-size: _rem(16);
      font-style: normal;
      font-weight: 400;
      line-height: 130%; /* 20.8px */
    }
  }
}
</style>