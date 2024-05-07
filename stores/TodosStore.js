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
      const host = '/api/todos';
      const todos = await $fetch(host, {
        method: 'GET',
      });
      this.todos = todos
    },

    // 新增 todo 資訊
    async postTodos (body) {
      const host ='/api/todos';
      await $fetch(host, {
        method: 'POST',
        body
      });
      this.getTodos()
    },

    // 編輯 todo 資訊
    async editTodos (body,qurey) {
      const host =`/api/todos?id=${qurey}`;
      await $fetch(host, {
        method: 'PATCH',
        body
      });
      this.getTodos()
    },

    // 刪除 todo 資訊
    async deleteTodos (qurey) {
      const host = qurey?`/api/todos?id=${qurey}`:'/api/todos';
      await $fetch(host, {
        method: 'DELETE',
      });
      this.getTodos()
    }
  }
})
