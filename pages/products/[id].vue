<template>

    <div>
      指定ID:{{id}}_產品
    </div>
  </template>
  
  <script>
  export default {
    data(){
        return{
            id:useRoute().params.id
        }
    },
    methods:{

    }
  }
  </script>
  
  <style>
  
  </style>