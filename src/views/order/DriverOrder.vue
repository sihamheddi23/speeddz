<template>
  <navbar></navbar>
  <download-page v-if="loding"></download-page>
  <div  v-else class="auth pt-3 h-100">
    <div class="container pb-4">
      
      <div v-if="!accepted">
            <h3 class="my-4 text-center">
            قائمة الطلبيات
          </h3>
          <div  v-if="orders.length==0" class=" container alert alert-info  text-right" role="alert">
              لا يوجد طلبيات لحد الساعة 
          </div>
          <driver v-for="order in orders" :key="order.index" :order="order" @select="(e)=>selected(e)" />
      </div>

      <div v-else>
         <Step :order="order" @delivered="(code)=>checkAndDelivered(code)"/>
        
      </div>
     
    
    </div>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import Step from '../../components/orders/Step.vue'
import Driver from '../../components/orders/Driver.vue'
import { acceptingOrder, getOrdersForDriver , rejectedAllOrders } from '../../backend_utilities/orders'
import DownloadPage from '../../components/orders/DownloadPage.vue'

export default {
  components: { Navbar, Driver, Step, DownloadPage },
  data(){
     return {
       accepted:false,
       loding:true,
       orders:[],
       order:null,
       ans:false
      }
  },
    mounted(){
      getOrdersForDriver(this.$store.state.currentUser.uid)
      .then(res=> {
        this.loding = false
        console.log(res);
        const index = res.findIndex(obj=>obj.status == 1 )
        if(index!= -1) {
          this.accepted = true
          this.order = res[index]
        
        }
        else this.orders = res
        
      })
      .catch((err)=> {
        console.log(err);
        this.$toast.open({
                          message:'السرفر لا يعمل',
                          type:"error",
                          position:"top"
                          }) })

    }
  ,
  methods:{
    checkAndDelivered(code){

    },
    selected(v){
    acceptingOrder(v).then(()=>{
      
       rejectedAllOrders(this.$store.state.currentUser.uid).then(()=>{
           this.accepted = true
           this.order = this.orders[this.orders.findIndex(obj=>obj.id == v)] 
          
        })     
    
       
    }).catch(err=>{
      console.log(err);
      this.$toast.open({
                          message:'السرفر لا يعمل',
                          type:"error",
                          position:"top"
                          }) 
    })
 
  }
  }
}
</script>

<style scoped>
 
 .auth {
   min-height: 100vh;
  
 }

</style>