<script setup lang="ts">
const listRegister = ref([])
onMounted(()=>{
  listRegister.value = JSON.parse(localStorage.getItem('list-register'))
})
const user = useCookie('user')
function getRandomInt() {
  let min = Math.ceil(1);
  let max = Math.floor(99999999);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function successUser(index:number){
  let copyLR = JSON.parse(localStorage.getItem('list-register'))
  let copyUL =JSON.parse( localStorage.getItem('user-list'))
  if (!copyUL){
    copyUL = []
  }
  copyUL.push({...copyLR[index],about:'',codeActivate:getRandomInt()})

  copyLR.splice(index,1)
  listRegister.value = copyLR
  localStorage.setItem('user-list',JSON.stringify(copyUL))
  localStorage.setItem('list-register',JSON.stringify(copyLR))
}
</script>

<template>
<div class="main-page">


  <header>
    <h1>Заявки на регистрацию</h1>
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
  <div class="content">
    <table>
      <thead>
      <tr>
        <th>
          Действие
        </th>
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
      <tbody v-if="listRegister">
      <tr v-for="(user,index) in listRegister">
        <td class="action">
          <div class="container">
            <button @click="successUser(index)" class="success">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                <path d="M6.09375 11.7497L1.875 7.53098L2.53781 6.86816L6.09375 10.4236L12.4622 4.05566L13.125 4.71848L6.09375 11.7497Z" fill="#43A047"/>
              </svg>
            </button>
            <button class="denied">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M11 4.1125L10.3875 3.5L7.5 6.3875L4.6125 3.5L4 4.1125L6.8875 7L4 9.8875L4.6125 10.5L7.5 7.6125L10.3875 10.5L11 9.8875L8.1125 7L11 4.1125Z" fill="#E53935"/>
              </svg>
            </button>
          </div>
        </td>
        <td class="name"><nuxt-link :to="'/clients/'+user.data.id">{{ user.data.organization ?  user.data.organization: `${user.data.lastName} ${user.data.firstName} ${user.data.patronymic}`}}</nuxt-link> </td>
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
.main-page{
  flex-direction: column;
  min-width: 100%;
}
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
.user{
  gap: _rem(8);
}
table{
  max-width: 100%;
  width: 100%;
  td,th{
    background: white;
    padding: _rem(10) _rem(18);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  th{
    color: var(--primary-colors-secondary, #909CA2);
    font-size: _rem(16);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
  }
  td{
    color: var(--primary-colors-primary, #2C4652);
    font-size: _rem(16);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
    max-width: _rem(270);
  }
  .action{
    min-width: _rem(104);
    width: fit-content;
    .container{
      width: fit-content;
      gap: _rem(5);
      margin: auto;
    }
    button{
      display: flex;
      width: _rem(30);
      height: _rem(30);
      justify-content: center;
      align-items: center;
      border-radius: _rem(5);
      svg{
        width: _rem(15);
        height: _rem(15);
        aspect-ratio: 1/1;
      }
    }
    .success{
      border: 1px solid var(--success-2, #CBEDCC);
      background: var(--success-2, #CBEDCC);
    }
    .denied{
      background: var(--critical-2, #FFC9C8);
    }
  }
  .name{
    max-width: _rem(308);
    a{
      color: var(--buttons-bg-hovered, #01579B);
      font-size: _rem(16);
      font-style: normal;
      font-weight: 400;
      line-height: 130%; /* 20.8px */
    }
  }
}

</style>