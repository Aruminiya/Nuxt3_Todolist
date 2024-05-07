<template>
      <div class="container mx-auto">
            <main class="grid grid-cols-1" @click="editId = ''">
                <section class="py-10 px-5">
                    <div class="flex">
                        <div class="relative w-full">
                            <input v-model="postData.content" 
                            type="search" id="search-dropdown" 
                            class="border-2 border-mataWallBlack block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-lg" placeholder="加入您的待辦事項" required />
                            <button 
                            @click="toPostTodo()"
                            type="button"
                            class="absolute btn MetaWall_button border-2 border-mataWallBlack top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-mataWallBlue rounded-e-lg">
                            <span class="m-2">+</span>
                            </button>
                        </div>
                    </div>
                </section>
                <section class="py-10 px-5">
                    <div class="todoList border-2 border-mataWallBlack bg-metaWallWhite rounded-lg overflow-hidden">
                        <!-- 篩選按鈕區塊 -->
                        <div class="filterBtns flex">
                            <button class="filterBtn py-3 transition flex-1 bg-mataWallBlue border-r-2 border-b-2 border-mataWallBlack border-mataWallBlack" :class="{active:listMode===0}" @click="listMode=0" >
                                全部
                            </button>
                            <button class="filterBtn py-3 transition flex-1 border-r-2 border-b-2 border-mataWallBlack border-mataWallBlack" :class="{active:listMode===1}" @click="listMode=1" >
                                已完成
                            </button>
                            <button class="filterBtn py-3 transition flex-1 border-b-2 border-mataWallBlack" :class="{active:listMode===2}" @click="listMode=2">
                                未完成
                            </button>
                        </div>
                        <!-- 待辦事項區塊 -->
                        <div class="todos">
                            <div v-if="isLoading" class="flex justify-center items-center w-full my-10">
                                <img src="../assets/Loading_Rolling.gif" alt="" width="60" height="60">
                            </div>
                            <div v-else>
                                <h2 class="text-3xl text-center text-mataWallGray-300 my-10" v-if="todoMode.length===0">沒有任何資料喔！</h2>
                                <div v-for="todo in todoMode" :key="todo.id">
                                        <div class="todo flex flex-row-reverse w-full text-xl p-5">
                                        <div class="flex-none">
                                            <button v-if="editId !== todo.id" class="mx-2" @click.stop="editId = todo.id;editData.content = todo.content">編輯</button>
                                            <button v-else class="mx-2" @click.stop="toEditTodo(todo)">完成</button>
                                            <button class="mx-2" @click.stop="toDeleteTodo(todo)">刪除</button>
                                        </div>
                                        <div class="flex-1">
                                            <input :id="todo.id" class="checkBox mx-2" type="checkbox" name="todo" :checked="todo.isChecked" @click.stop="toCheckTodo(todo)">
                                            <label v-if="editId !== todo.id" :for="todo.id">{{todo.content}}</label>
                                            <input v-else v-model="editData.content" class="border-2 border-mataWallBlack rounded px-3" type="text" @click.stop>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn MetaWall_button py-1 px-6 my-3" type="button" @click.stop="toDeleteTodo()">清除所有待辦事項</button>
                    &emsp;
                    <nuxt-link class="" to="/">
                      回到首頁
                    </nuxt-link>
                </section>
            </main>
        </div>
</template>

<script >
import Swal from 'sweetalert2'

// pinia
import { mapState, mapActions } from 'pinia'
import todosStore from '../stores/TodosStore.js';

export default {
    data(){
        return{
            listMode:0,
            isLoading: true,
            postData:{
                content: "",
                isChecked: false
            },
            editData:{content: ""},
            editId:""
        }
    },
    computed:{
        ...mapState(todosStore, ['todos']),
        todoMode(){
            if(this.listMode === 0){
                return this.todos
            }else if(this.listMode === 1){
                return this.todos.filter(e=>e.isChecked === true)
            }else if(this.listMode === 2){
                return this.todos.filter(e=>e.isChecked === false)
            }else{
                return '無效的模式'
            }
        }
    },
    mounted(){
        this.getTodos().then(()=>{this.isLoading = false});
    },
    methods:{
        ...mapActions(todosStore, ['getTodos','postTodos','editTodos','deleteTodos']),
        toPostTodo(){
            if(this.postData.content !== ""){
                this.isLoading = true;
                this.postTodos(this.postData).then(()=>{this.isLoading = false});
            }
        },
        toEditTodo(todo){
            this.isLoading = true;
            this.editId = '';
            this.editTodos(this.editData,todo.id).then(()=>{this.isLoading = false});
        },
        toCheckTodo(todo){
            this.isLoading = true;
            this.editTodos({content:todo.content,isChecked:!todo.isChecked},todo.id).then(()=>{this.isLoading = false});
        },
        toDeleteTodo(todo){
            Swal.fire({
                title: todo?"確定要刪除該筆資料嗎？":"確定要刪除全部資料嗎？",
                text: "刪除後資料將無法恢復！",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消",
                confirmButtonColor: "#03438D",
                cancelButtonColor: "#9B9893"
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.isLoading = true;
                    this.deleteTodos(todo?.id).then(()=>{this.isLoading = false});
                }
            });
        }
    },

};
</script>

<style lang="scss" scoped>
 @import "../assets/scss/main.scss";

.todoList{
    min-height: 70vh;
}

.filterBtn{
    background-color: $MataWall_gray02;
    &:hover{
        background-color: $MetaWall_lightBlue;
    }
}
.filterBtn.active{
    background-color: $MataWall_blue;
    color: $MetaWall_white;
}

input[type=checkbox] {
    scale: 1.5;
    &:checked{
        background-color: #444;
    }
}

</style>