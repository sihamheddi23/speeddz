<template>
        <div class="bg-light p-3 card mt-2">
        <div class="d-flex">
          <div class="d-flex flex-column w-50 ">
                 <div class="mx-3">
                  <img src="../../assets/photo.png" alt="" class="img">
                 </div>
                   <div>
                     <button class="btn btn-info  mt-3 mx-3" @click="$emit('select',order.id)">اختر</button>
                   </div>
              </div>
              <div class="d-flex flex-column text-right w-50">
                      <h6 > {{ order.client_info.fullName }} اسم الزبون   </h6>
                      <small>  {{ order.client_info.phone }} رقم لهاتف </small>
                      
                      <p class="m-0 mt-4">  {{ order.routes[0].from.adress }} <b>الموقع الحالي</b></p>
                      <p class="mb-0">  <b>الوجهة</b> {{ order.routes[1].to.adress }}</p>
              </div>

             
        </div>
         
      </div>
</template>

<script>
export default {
  props:["order","index"],
mounted(){
  console.log("fsffs ",this.$props.index);
}
}
</script>

<style scoped>

.btn {
  width: 5em ;
 }
.img {
  width: 5em;
  height: 5em;
}
.card {
  width: 100%;
  height: fit-content;
}
</style>