<script setup lang="ts">
import Select from "~/components/UI/Select.vue";

const emit = defineEmits<{
  result:[Object]
}>()
const formData = ref({
  INN: '',
  lastName: '',
  firstName: '',
  patronymic: '',
  organization: '',
  tel: '',
  curator: '',
  mail: '',
  district: ''
})
watch(()=>formData.value,()=>{
  emit('result',formData.value)
},{deep:true})
</script>

<template>
  <div class="register-people">
    <div class="row">
      <div class="params-select">
        <p>ИНН*</p>
        <input v-model="formData.INN" placeholder="__ __ ______ __">
      </div>

    </div>
    <div class="row">
      <div class="params-select">
        <p>Фамилия*</p>
        <input v-model="formData.lastName" placeholder="Ваша фамилия"/>
      </div>
      <div class="params-select">
        <p>Имя*</p>
        <input v-model="formData.firstName" placeholder="Ваше имя"/>
      </div>
      <div class="params-select">
        <p>Отчество</p>
        <input v-model="formData.patronymic" placeholder="Ваше отчество"/>
      </div>
    </div>
    <div class="row">
      <div class="params-select">
        <p>Телефон*</p>
        <input v-model="formData.tel" placeholder="+7 (___) ___-__-__"/>
      </div>
      <div class="params-select">
        <p>Электронная почта*</p>
        <input v-model="formData.mail" placeholder="_@_._"/>
      </div>
    </div>
    <div class="row">
      <div class="params-select">
        <p>Куратор*</p>
        <Select v-model="formData.curator" placeholder="Выберите куратора"
                :list-select="['Петров Н.В.','Иванов Г.И.','Кондратьев К.К.']"></Select>
      </div>
      <div class="params-select">
        <p>Район*</p>
        <Select v-model="formData.district" placeholder="Выберите район"
                :list-select="['Воловский', 'Грязинский', 'Данковский', 'Добринский', 'Добровский', 'Долгоруковский', 'Елецкий', 'Задонский', 'Измалковский', 'Краснинский', 'Лебедянский', 'Лев-Толстовский', 'Липецкий', 'Становлянский', 'Тербунский', 'Усманский', 'Хлевенский', 'Чаплыгинский']"></Select>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.register-people {
  width: 100%;
  display: flex;
  gap: _rem(32);
  flex-direction: column;
}

.params-select {
  flex-direction: column;
  gap: _rem(8);
  width: _rem(296);
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(_rem(296), _rem(296)));
  gap: _rem(16);
}
</style>