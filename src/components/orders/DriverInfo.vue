<template>
    <div class="m-2 border border-1 border-secondary">
      
       <h5 class="my-3 text-center">
          معلومات السائق
       </h5>
 
       <div class="d-flex my-3">
          
          <div class="mx-2">
                   <img src="../../assets/photo.png" alt="" class="img ml-2">
          </div>
          <div class="text-right w-100 mr-3">
             <p class="m-0">{{ c.fullName }} اسم السائق </p>
             <small>{{ c.phone }} رقم الهاتف</small>
          </div>
 
       </div>
 
    </div>
 </template>
 
 <script>
 export default {
   props:["c"],
   mounted(){
    console.log(this.$props.c);
   }
 }
 </script>
 
 <style>
 .img {
   width: 3em;
   height: 3em;
 }
 </style>