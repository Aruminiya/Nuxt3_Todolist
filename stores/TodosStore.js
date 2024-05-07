import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

// or via CommonJS

export default defineStore('TodosStore', {
  // data, methods, computed
  // state, actions, getters
  state: () => ({
    todos:[]
  }),
  getters: {},
  actions: {
    // 得到 todos 資訊
    async getTodos () {
      const todos = await $fetch('/api/todos', {
        method: 'GET',
      });
      this.todos = todos
    },

    // 新增 todo 資訊
    async postTodos (body) {
      await $fetch('/api/todos', {
        method: 'POST',
        body
      });
      this.getTodos()
    },

    // 編輯 todo 資訊
    async editTodos (body,qurey) {
      await $fetch(`/api/todos?id=${qurey}`, {
        method: 'PATCH',
        body
      });
      this.getTodos()
    }
  }
})
