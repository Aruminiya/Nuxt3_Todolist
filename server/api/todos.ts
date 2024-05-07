import { v4 as uuidv4 } from 'uuid';

function errorHandler(statusCode: number,message: string){
  return {
    statusCode,
    message
  }
}

let todos = [
  {
      id:"5a38ffac-2b36-4b70-870f-553c32dab3c5",
      content:"購買晚餐食材",
      isChecked: false
  },
  {
      id:"0007879d-b14b-4726-a87b-04845a14d1f0",
      content:"回家準備考試複習",
      isChecked: false
  },
  {
      id:"6d3b66f2-60f7-4765-9d55-d572f16efb72",
      content:"出門運動",
      isChecked: false
  },
]


export default defineEventHandler(async (event) => {

  try{
  // 取得 todo
  if(event.method === "GET"){
    return todos
  }

  // 新增 todo
  if(event.method === "POST"){
    // 抓到使用者的 body
    const reqBody = await readBody(event);
    if(reqBody){
      reqBody.id = uuidv4();
      todos.push(reqBody);
      return reqBody
    }else{
      return errorHandler(400,"沒有輸入 Body 資料");
    }
  }

  // 刪除 todo
  if(event.method === "DELETE"){
    // 抓到使用者的 id Query
    const reqQuery = await getQuery(event);
    // 如果有抓到 Query 的話 刪除該 ID 資料
    if(Object.keys(reqQuery).length){
      let deleteTodo = todos.filter(e=>e.id === reqQuery.id);
      todos = todos.filter(e=>e.id !== reqQuery.id);
      return deleteTodo
    }else{
      // 如果沒有 Query 的話 刪除全部資料
      todos = [];
      return todos
    }
  }

  // 編輯 todo
  if(event.method === "PATCH"){
    // 抓到使用者的 body
    const reqBody = await readBody(event);
    // 抓到使用者的 id Query
    const reqQuery = await getQuery(event);
    if(reqBody && Object.keys(reqQuery).length){
      const editTodoIndex = todos.findIndex(e=>e.id === reqQuery.id);
      todos[editTodoIndex].content = reqBody.content
      if(reqBody.isChecked !== undefined){todos[editTodoIndex].isChecked = reqBody.isChecked}
      return todos[editTodoIndex]
    }else{
      return errorHandler(400,"沒有輸入 Body 或 Query 資料");
    }
  }
  }catch(err){
    return err
  }
})
  