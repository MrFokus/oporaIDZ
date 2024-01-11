<script setup lang="ts">
const props = defineProps<{
  listSelect:string[],
  placeholder?:string,
  modelValue:string,
}>()
const isOpen = ref(false)
const selected = ref('')
const emit = defineEmits<{
  'update:modelValue':[string]
}>()
function select(index:number){
  selected.value = props.listSelect[index]
  isOpen.value = false
  emit('update:modelValue',selected.value)
}
</script>

<template>
  <div tabindex="0" class="select">
    <button @click.stop="isOpen = !isOpen"><span>{{selected?selected:placeholder}}</span> <svg :style="{transform:isOpen?'rotate(180deg)':''}" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 13.75L3.75 7.5L4.625 6.625L10 12L15.375 6.625L16.25 7.5L10 13.75Z" fill="#90A4AE"/>
    </svg></button>
    <ul v-if="isOpen" class="list-select">
      <li @click="select(index)" class="option" v-for="(option,index) in listSelect">
        {{option}}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.select{
  width: 100%;
  flex-direction: column;
  position: relative;
  button{
    display: flex;
    max-width: 100%;
    padding: _rem(16);
    gap: _rem(8);
    justify-content: space-between;
    align-items: center;
    border-radius: _rem(10);
    background: $white;
    color: var(--primary-colors-primary, #607D8B);
    font-size: _rem(16);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 20.8px */
    cursor: pointer;
    span{
      text-align: start;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
    }
  }
  .list-select{
    max-height: _rem(200);
    overflow: scroll;
    display: flex;
    flex-direction: column;
    gap: _rem(4);
    width: 100%;
    position: absolute;
    z-index: 2;
    background: $white;
    border-radius: _rem(10);
    top: 110%;
    cursor: pointer;
    li{
      border-radius: _rem(10);
      background: $white;
      padding: _rem(16);
      &:hover{
        background: #d7d7d7;
      }
    }
  }
}
</style>