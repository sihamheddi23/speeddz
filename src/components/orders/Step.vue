<template>

  <div class="container mt-2">
    <div class="bg-light w-100 step d-flex flex-lg-row flex-column ">
       <Map :r="order.routes"/>
        <div class="pl-4 w-50 d-flex flex-column ">
           <Horloge :id="order.id" />
 
           <ClientInfo v-if="type==1"  :c="order.client_info"/>
           <DriverInfo v-else  :c="order.driver_info"/>


       </div> 
    </div>
  </div>

</template>

<script>
import ClientInfo from './ClientInfo.vue';
import DriverInfo from './DriverInfo.vue';
import Horloge from './Horloge.vue';
import Map from './Map.vue';

export default {
    components: { ClientInfo, Horloge, Map, DriverInfo },
    props:["order"],
    data(){
       return{
        type:this.$store.state.currentUser.type,
       }
    },
    mounted(){
      console.log(this.type);
      console.log(this.order.id);
    }
}
</script>

<style>
.step {
    width: 100%;
    min-height: 70vh;
    max-height: 200vh;
}

</style>