<template>
   <div>
     <div class="horloge d-flex flex-column mt-3 align-items-center text-center mx-auto">
        <!-- <h4>المرحلة {{s}}</h4> -->
        <circle-progress :percent="percent"  class="my-4 "/>
         <div class="time-spend">
      
            <h6>
               {{time.h }}.{{time.m}}.{{ time.s }}
            </h6>
            <p>
               الزمن المستغرق
            </p>
         </div>
         <div v-if="type==1">
             <div  v-show="go">
               <h5>أدخل الرمز</h5>
               <div class="row mt-3 ">
                  <input class="col-8 form-control form-control-sm mr-4" v-model="co" type="text" placeholder="الرمز ..." aria-label=".form-control-sm example">
                  <button class="col btn btn-primary" @click="confirmedcode">تأكـيد</button>
               </div>
             </div>

         </div>
         <div v-else>
               <div v-show="go">
                  <h1>
                     الرمز
                  </h1>
                   <small>
                     {{ code  }}
                   </small>
               </div>
         </div>
        
     </div>
   </div>
</template>

<script>

import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { checkCode, deliveredOrder, storeCodeOfTruck } from '../../backend_utilities/orders';
export default {
  components: {CircleProgress},
  props:["s","id"],
  mounted(){
   this.clockAuto()
   console.log("id  ",this.id);
  },
  data(){
     return {
      co:0,
      type:this.$store.state.currentUser.type,
      percent:100,
      c:new Date().toTimeString(),
      h:null,
      go:false,
      code:"",
      // step:this.$props.s,
      time : {
            h:0,
            m:0,
            s:0
         }
     }
  },
  watch:{
  
   c(n){
          let g = n.split(" ")[0].split(":")[0]
         if(g==23) {
            this.percent = 0
            this.go = true
            clearInterval(this.h)
         }
    }
    ,
    go(n){
      if(this.type==0 )
      {
         this.code = Math.floor(Math.random() * 1000) + 1;
         this.storeCode(  this.code)
      }
  
    }

  },
  methods:{
   confirmedcode(){
      checkCode(this.co,this.id).then(s=>{
         if(s) {
            this.$toast.open({
              message:'        الرمز صحيح  ',
              type:"success",
              position:"top"
              })
              deliveredOrder(this.id)
              .then(()=>{
                     this.$toast.open({
                  message:'   قم بتسليم الشحنة   ',
                  type:"success",
                  position:"top"
                  })
              })
          
         }
         else{
            this.$toast.open({
              message:'    الرمز خاطئ يرجى اعادة المحاولة  ',
              type:"warning",
              position:"top"
              })

         }
      }).catch(err=>console.log(err)) 
   },
   storeCode(code){
      storeCodeOfTruck(code,this.id).then(()=>{
         this.$toast.open({
              message:'لا تشارك الرمز الخاص بك حتى تصلك الشحنة',
              type:"info",
              position:"top"
              })
      })
      .catch(err=>{
         this.$toast.open({
              message:'السرفر لا يعمل',
              type:"error",
              position:"top"
              })
         console.log(err)
      
      
      })
   },
      clockAuto(){
    
         let date = new Date();

         date.setHours(this.time.h);
         date.setMinutes(this.time.m);
         date.setSeconds(this.time.s);
         
         let newDate = date;
         let temp = null;
         let tempsplit = null;
         
         this.h = setInterval(()=>{

            newDate= new Date(newDate.valueOf() - 1000);
            this.c= newDate.toTimeString()
            this.time.h = newDate.getHours()
            this.time.m = newDate.getMinutes()
            this.time.s = newDate.getSeconds()
            this.percent = this.percent - 0.42
           

         },1000)
         
      }
  }
}
</script>

<style>
.time-spend {
   position: relative;
   top:-8.5rem;
}
.horloge {
   min-width: 50%;
   max-width: 100%;
}
</style>