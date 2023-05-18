<script setup>
import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter()
const logout = async () => {
  const {data} = await axios.post('http://localhost:8080/api/logout');
  console.log(data)
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  document.cookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('nameOfTodo')
  localStorage.removeItem('todos')
  await router.push('/login')
}
</script>

<template>
  <div class="flex items-center justify-center p-4 gap-4">
    <router-link to="/">
      <p class="font-bold cursor-pointer">
        Todo List
      </p>
    </router-link>
    <router-link to="/login">
      <p class="font-bold cursor-pointer">
        Login
      </p>
    </router-link>
    <router-link to="/register">
      <p class="font-bold cursor-pointer">
        Register
      </p>
    </router-link>
    <button @click="logout">
      <p class="font-bold cursor-pointer">
        Logout
      </p>
    </button>
  </div>
</template>
<script>
export default {
  name: 'MainHeader'
}
</script>

<style>
.menu {
  display: flex;
  justify-content: center;
}

.item-menu {
  margin: 10px;
  font-size: large;
  cursor: pointer;
  font-weight: 600;
}

.link {
  color: inherit;
  text-decoration: none;
}
</style>