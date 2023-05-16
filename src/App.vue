<script setup>
import {computed, ref, watch, onMounted} from "vue";

const todos = ref([])
const nameOfTodo = ref('')
const input_content = ref('')
const input_category = ref(null)
const viewType = ref('all')

onMounted(() => {
  nameOfTodo.value = localStorage.getItem('nameOfTodo') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})
const addTodo = () => {
  if (input_content.value === '' || input_category.value === null) {
    alert('Please fill in all fields')
  } else {
    todos.value.push({
      id: todos.value.length + 1,
      content: input_content.value,
      category: input_category.value,
      createAt: new Date().getTime(),
      completed: false
    })
    input_content.value = ''
    input_category.value = null
  }
}

const deleteTodo = (todo) => {
  const index = todos.value.indexOf(todo)
  todos.value.splice(index, 1)
}

const sortTodos = computed(() => {
  return todos.value.sort((a, b) => {
    return b.createAt - a.createAt
  })
})

const filteredTodos = computed(() => {
  if (viewType.value === 'all') {
    return sortTodos.value
  } else if (viewType.value === 'completed') {
    return sortTodos.value.filter(todo => todo.completed)
  } else if (viewType.value === 'unCompleted') {
    return sortTodos.value.filter(todo => !todo.completed)
  } else if (viewType.value === 'business') {
    return sortTodos.value.filter(todo => todo.category === 'Business')
  } else if (viewType.value === 'personal') {
    return sortTodos.value.filter(todo => todo.category === 'Personal')
  }
})
watch(nameOfTodo, (newVal) => {
  localStorage.setItem('nameOfTodo', newVal)
})
watch(todos, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, {deep: true})
</script>

<template>
  <main class="flex flex-col items-center justify-start bg-gray-200 min-h-screen">
    <section class="flex items-center justify-start p-4 w-[90%] lg:w-[60%]">
      <h1 class="text-2xl">Todo List of <input type="text" placeholder="Enter name here" v-model="nameOfTodo"
                                               class="outline-none bg-gray-200 font-semibold"></h1>
    </section>
    <section class="p-4 w-[90%] lg:w-[60%]">
      <p class="text-lg font-bold">Create your todo</p>
      <form @submit.prevent="addTodo" class="flex flex-col gap-4">
        <p class="font-semibold text-gray-500">What's on your todo list?</p>
        <input type="text" placeholder="Enter your todo here..." v-model="input_content"
               class="px-4 py-2 border rounded outline-none">
        <p class="font-semibold text-gray-500">Pick a category</p>
        <div class="flex gap-4">
          <label class="p-4 bg-white shadow cursor-pointer flex gap-2 items-center rounded">
            <input type="radio" name="category" value="Business" v-model="input_category" class="accent-pink-500"/>
            <span>Business</span>
          </label>
          <label class="p-4 bg-white shadow cursor-pointer flex gap-2 items-center rounded">
            <input type="radio" name="category" value="Personal" v-model="input_category" class="accent-green-500"/>
            <span>Personal</span>
          </label>
        </div>
        <input type="submit" value="Submit"
               class="flex items-center justify-center bg-green-500 p-2 rounded text-white font-semibold cursor-pointer hover:bg-green-600 transition">
      </form>
    </section>
    <section class="w-[90%] lg:w-[60%] p-4">
      <div class="mb-6">
        <p class="mb-3 font-semibold text-gray-500">Select type to view:</p>
        <div class="flex gap-3 flex-wrap">
          <label class="flex gap-2 bg-white rounded w-fit px-4 py-2 shadow">
            <input type="radio" name="viewType" v-model="viewType" value="all">
            <span>All</span>
          </label>
          <label class="flex gap-2 bg-white rounded w-fit px-4 py-2 shadow">
            <input type="radio" name="viewType" v-model="viewType" value="completed">
            <span>Completed</span>
          </label>
          <label class="flex gap-2 bg-white rounded w-fit px-4 py-2 shadow">
            <input type="radio" name="viewType" v-model="viewType" value="unCompleted">
            <span>Un Completed</span>
          </label>
          <label class="flex gap-2 bg-white rounded w-fit px-4 py-2 shadow">
            <input type="radio" name="viewType" v-model="viewType" value="business">
            <span>Business</span>
          </label>
          <label class="flex gap-2 bg-white rounded w-fit px-4 py-2 shadow">
            <input type="radio" name="viewType" v-model="viewType" value="personal">
            <span>Personal</span>
          </label>
        </div>
      </div>
      <div class="mb-2 font-bold">
        Your todo list:
      </div>
      <ul class="flex flex-col gap-2 ">
        <li v-for="todo in filteredTodos" key=":todo"
            class="font-semibold flex items-center justify-between gap-4 w-full">
          <div class="flex gap-4">
            <input type="checkbox" class="h-6 w-6" v-model="todo.completed"
                   :class="`${todo.category === 'Business' ? 'accent-blue-500' : 'accent-green-500'}`">
            <span
                :class="`${todo.completed && 'line-through'}`">Todo content: <input type="text" v-model="todo.content"
                                                                                    :class="`${todo.completed && 'line-through'} bg-gray-200`">
              </span>
          </div>
          <div class="flex items-center gap-2">
            <p>Type: <span :class="`${todo.category === 'Business'  ? 'text-blue-500' : 'text-green-500'} text-lg`">{{
                todo.category
              }}</span></p>
            <button class="bg-red-500 px-4 py-2 rounded text-white" @click="deleteTodo(todo)">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>


