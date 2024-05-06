<template>
      <div class="container mx-auto">
            <main class="grid grid-cols-1">
            <section class="py-10 px-5">
                <div class="flex">
                    <div class="relative w-full">
                        <input type="search" id="search-dropdown" class="border-2 border-mataWallBlack block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-lg" placeholder="加入您的待辦事項" required />
                        <button type="submit" class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-mataWallBlue rounded-e-lg">
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
                        <div class="todo flex flex-row-reverse w-full text-xl p-5">
                            <div class="flex-none">
                                <button class="mx-2">編輯</button>
                                <button class="mx-2">刪除</button>
                            </div>
                            <div class="flex-1">
                                <input id="todo" class="checkBox mx-2" type="checkbox" name="todo">
                                <label for="todo">購買晚餐食材</label>
                            </div>
                            
                        </div>
                        <hr />
                    </div>
                </div>
            </section>
            </main>
        </div>


</template>

<script >
export default {
    data(){
        return{
            listMode:0
        }
    }
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