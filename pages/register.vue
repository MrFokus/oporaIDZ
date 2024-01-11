<script setup lang="ts">
import Select from "~/components/UI/Select.vue";
import RegisterCompany from "~/components/Modules/RegisterCompany.vue";
import RegisterPeople from "~/components/Modules/RegisterPeople.vue";
definePageMeta({
  layout:false,
})

function getRandomInt() {
  let min = Math.ceil(1);
  let max = Math.floor(99999999);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
const typeRegister = ref('')
// const listRegister = useCookie('list-register')
const formData = ref({})

function setFormData(obj:any){
  formData.value = obj
}
function setCookie(){
  if (localStorage.getItem('list-register')){
    let copyListRegister = JSON.parse(localStorage.getItem('list-register'))
    copyListRegister.push({data:{id:getRandomInt(),...formData.value} ,type:typeRegister.value})
    localStorage.setItem('list-register',JSON.stringify(copyListRegister))

  }
  else{
    let copyListRegister = [{data:{id:getRandomInt(),...formData.value} ,type:typeRegister.value}]
    localStorage.setItem('list-register',JSON.stringify(copyListRegister))
  }
  console.log(localStorage.getItem('list-register'))
}
</script>

<template>
  <div class="register-page">
    <header>
      <div class="logo">
        <img src="@/assets/img/logo.svg" alt="">
        <p>Заявка на регистрацию в Системе</p>
      </div>
      <p class="mandatory-description">Пункты отмеченые * обязательны для заполнения</p>
    </header>
    <form @submit.prevent>
      <div class="inputs">
        <div class="column type-column">
          <div class="params-select">
            <p>Категория</p>
            <Select v-model="typeRegister" placeholder="Выберите категорию" :list-select="['ИП','Физическое лицо','Организация']"></Select>
          </div>
        </div>
        <register-company @result="setFormData" v-if="typeRegister==='Организация'"/>
        <register-people @result="setFormData" v-if="typeRegister==='ИП'|| typeRegister==='Физическое лицо'"/>
      </div>
      <div class="btn-container">
        <button @click="setCookie" class="gray send">Отправить заявку</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.register-page {
  max-width: _rem(1232);
  width: 100%;
  margin: _rem(40) auto;
  flex-direction: column;
  gap: _rem(32);
  header{
    gap: _rem(32);
    align-items: end;
    .logo{
      gap: _rem(20);
      img{
        width: _rem(75);
        height: _rem(75);
      }
      p{
        width: _rem(185);
        color: var(--primary-colors-primary, #2C4652);
        font-size: _rem(18);
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 25.2px */
      }
    }
    .mandatory-description{
      color: var(--primary-colors-secondary, #909CA2);
      font-size: _rem(14);
      font-style: normal;
      font-weight: 400;
      line-height: 115%; /* 16.1px */
    }
  }
  form{
    width: 100%;
    .btn-container{
      width: 100%;
      justify-content: end;
    }
    .send{
      min-width: _rem(296);
      width: fit-content;
    }
  }
  .inputs{
    width: 100%;
    display: grid;
    grid-template-columns: _rem(296) 1fr;
    gap: _rem(16);
  }
}
.params-select {
  flex-direction: column;
  width: 100%;
  gap: _rem(8);
}

.column {
  gap: _rem(32);
  flex-direction: column;
}
</style>