<script setup lang="ts">
definePageMeta({
  layout:false,
})
const cred = [
  {
    login: 'user',
    password: "password",
    rules:'user'
  },
  {
    login: 'admin',
    password: "password",
    rules:'admin'
  },
]
const login = ref('')
const password = ref('')
const router = useRouter()
const error = ref('')
const user = useCookie('user')

function auth() {
  let indexUser=-1
  cred.forEach((c,index) =>{
    if (c.login ===login.value){
      indexUser = index
    }
  })
  if (indexUser!==-1&&login.value === cred[indexUser].login && password.value === cred[indexUser].password) {
    user.value = JSON.stringify({
      name: cred[indexUser].login,
      rules: cred[indexUser].rules
    })
    router.push('/')
  } else {
    error.value = "Почта и/или пароль указаны неверно"
    setTimeout(() => {
      error.value = ''
    }, 3000)
  }
}
</script>

<template>
  <div class="login-page">
    <div class="title">
      <img src="~/assets/img/logo.svg" alt="">
      <p>Вход в систему</p>
    </div>
    <form @submit.prevent="auth">
      <label for="login">
        Логин
        <input v-model="login" id="login" placeholder="Логин" type="text">
      </label>
      <label for="password">
        Пароль
        <input v-model="password" id="password" type="password" placeholder="Пароль">
      </label>
      <p v-if="error" class="error">{{ error }}</p>
      <nuxt-link class="register" to="/register">Или подайте заявку на регистрацию</nuxt-link>
      <button class="auth gray">Вход</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  gap: _rem(32);

  .title {
    flex-direction: column;
    gap: _rem(40);
    align-items: center;

    img {
      width: _rem(80);
      height: _rem(80);
      aspect-ratio: 1/1;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    min-width: _rem(400);
  }

  label:not(label:first-child) {
    margin-top: _rem(24);
  }

  label {
    flex-direction: column;
    gap: _rem(8);
    color: var(--primary-colors-secondary, #909CA2);

    /* Text x small medium */
    font-size: _rem(14);
    font-style: normal;
    font-weight: 500;
    line-height: 130%; /* 18.2px */
  }

  .error {
    margin-top: _rem(8);
    color: var(--special-colors-critical, #E53935);

    /* Text x small regular */
    font-size: _rem(14);
    font-style: normal;
    font-weight: 400;
    line-height: 130%; /* 18.2px */
  }

  .register {
    margin-top: _rem(16);
    font-size: _rem(14);
  }
}
</style>