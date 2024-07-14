<template>
<navbar></navbar>

<div class="auth p-2">
    <div class="container mx-lg-auto px-lg-auto px-md-2 mx-md-5  my-3 ">
    <form class="bg-light p-3  text-right" enctype="multipart/form-data" @submit.prevent="addTruck" >
        <h3 class="text-center my-2">
            اضافة المركبة 
        </h3>
        <div class="form-inline my-3 ">
              <div class="form-group w-50">
                <label for="immatricule">رقم الشاحنة</label>
                <input type="text" class="form-control w-100 ml-4" id="immatricule"  v-model="immatricule"  placeholder="أدخل رقم الشاحنة " required>
            </div>
            <div class="form-group w-50">
                <label for="mark">ماركة الشاحنة</label>
                <input type="text" class="form-control w-100 ml-4" id="mark"  v-model="mark"   placeholder="مثل renault " required>
            </div>
            <div class="form-group  w-100">
                <label for="model">نموذج الشاحنة</label>
                <input type="text" class="form-control w-100 ml-4" id="model"  v-model="model"   placeholder="مثل 207 " required>
            </div>
         
        </div>
      
          
   
        
        <div class="form-group  w-100">
                <label for="image">صورة الشاحنة </label>
                <input type="file" class="form-control  "  ref="file" id="image"   required>
        </div>
        <div class="form-inline mb-2 mx-5">

        <div class="form-group mt-2 ml-3">
                    <label >
                        نوع الأشياء
                    </label>
                  <select  class="form-control" v-model="type">

                      <option value="l" selected>السوائل</option>
                      <option value="b">مواد البناء</option>
                      <option value="bo">العلب</option>
                      <option value="v">السيارات</option>

                  </select>
                
        </div>
        <div class="form-group "   v-show="type!='l'">
                      <label for="weight">وزن الأشياء </label>
                      <input type="number" class="form-control ml-3 mr-2" id="weight" v-model="weight"  placeholder="وزن (كلغ)  " :required="type!='l'">
        </div>
         <div class="form-group "  v-show="type=='bo'">
                    <label for="width">طول الأشياء </label>
                    <input type="number" class="form-control ml-3 mr-2" id="width" v-model="width"  placeholder="طول  (متر) " :required="type=='bo'">
          </div>
            
          <div class="form-group " v-show="type=='l'">
                    <label for="volume"> السعة </label>
                    <input type="number" class="form-control ml-3 mr-2" id="width" v-model="volume"  placeholder="السعة  (لتر) " :required="type=='l'">
          </div>
       
  </div>
        
   <hr>
          
          <h5 class="text-center">موقعك الحالي</h5>
          
          <div class="form-inline mb-4 mx-5">
                <div class="form-group mt-2 ml-3">
                        <label >
                            ولاية 
                        </label>
                      <select  class="form-control" v-model="wilaya" required>

                          <option value="" selected>اختر</option>
                          <option v-for="w in wilayas" :key="w.id" :value="w.mattricule"> {{ w.name_ar  }}</option>

                      </select>
                    
                </div>
                <div class="form-group mt-2 ml-3">
                        <label >
                            الدائرة 
                        </label>
                      <select  class="form-control" v-model="daira" required>

                        <option value="" selected>اختر</option>
                          <option v-for="d in dairas" :key="d.id" :value="d.name_en"> {{ d.name_ar  }}</option>


                      </select>
                    
                </div>
                <div class="form-group mt-2 ml-3">
                        <label >
                            البلدية 
                        </label>
                      <select  class="form-control" v-model="baladiya" required>

                        <option value="" selected>اختر</option>
                          <option v-for="b in baladiyas" :key="b.id" :value="b.name_en"> {{ b.name_ar  }}</option>


                      </select>

              
                    
                </div>
                <div class="form-group mt-2 ml-3" required>
             
                        <input type="text" class="form-control w-100 ml-4" id="mark"  v-model="city"   placeholder="اسم القرية او المدينة  " required>

                    
                </div>
          </div>
          <hr>
          <div class="form-group ">
                    <label for="price">سعر الشحن (1كلم) </label>
                    <input type="number" class="form-control " id="price" v-model="price"  placeholder="DA " required >
          </div>
        <button type="submit" class="btn btn-primary container">تأكـــــــــيد</button>
   </form>
  </div>
  </div>
  </template>

<script>
import { getBaladyiatsForDaira,getWilayaByCode, getDairatsForWilaya, getWilayaList } from '@dzcode-io/leblad';
import Navbar from '../../components/Navbar.vue'
import {addTRUCK} from '../../backend_utilities/trucks'
import axios from "axios"
export default {
  components: { Navbar },
  methods:{
    async addTruck(e){
        if (price<500) {
           this.$toast.open({
                                message:  '500مبلغ الشحن يجب ان يكون اكثر من ',
                                type: 'error',
                                position:"top"
                           })
        }
        if (this.wilaya=="" || this.daira=="" || this.baladiya == "" || this.city == "") {
           this.$toast.open({
                                message:  'اختر موقعم الحالي ,احد الحقول فارغة',
                                type: 'error',
                                position:"top"
                           })
        }
        else {
          let ans = true

          const objects = {}

          if(this.type == 'l'){
               if(this.volume<=0) {
                  ans = false              
                 this.$toast.open({
                  message:"السعة يجب ان تكون اكبر من الصفر",
                  type:'error',
                  position:"top"
                 })


              }
               else{
              objects.volume = this.volume
               
            }
            }
            else if(this.type == "bo"){
              if(this.weight<=0 || this.width<=0) {
           
                  ans = false              
                  this.$toast.open({
                    message:"الوزن او الطول يجب ان تكون اكبر من الصفر",
                    type:'error',
                    position:"top"
                  })


              }
               else{
                objects.weight = this.weight
                objects.width = this.width
               }
            }
            else if(this.type == "b" || this.type == "v" ){
                  if(this.weight<=0 ) {
              
                      ans = false              
                      this.$toast.open({
                        message:"الوزن يجب ان تكون اكبر من الصفر",
                        type:'error',
                        position:"top"
                      })


                  }
                    else{
                        objects.weight = this.weight
                    }
              
              }
            if(ans){
              const file = this.$refs.file.files[0]
               const lookForlocation= (await axios.get("https://www.mapquestapi.com/geocoding/v1/address",{
                params:{
                  key:"i3sErUFFwFzmB9Mx1RLT4Up3TZuQFPTP",
                location:"algeria "+getWilayaByCode(this.wilaya).name_en+" "+this.daira+" "+this.baladiya+" "+this.city
                }
              
               }))

               const info = await addTRUCK(this.$store.state.currentUser.uid,file,{
                  price:this.price,
                  immatricule:this.immatricule,
                  mark:this.mark,
                  model:this.model,
                  type:this.type,
                  ...objects,
                 location:{
                  city:this.city,
                  baladiya:this.baladiya,
                  wilaya:this.wilaya,daira:this.daira,
                  latlang:lookForlocation.data.results[0].locations[0].latLng
                 },
                  volume: this.volume,
                  
                })

                if(info.s){
                    this.$store.commit("activateUser")
                    this.$router.push("/orders")
                }
            }
    
        }
    }
  },
  watch:{
    wilaya(n,o){
      
      if(n!=""){
        this.dairas = getDairatsForWilaya(n)
      }else{
        this.dairas = []
        this.baladiyas = []
        this.daira=""
        this.baladiya=""
      }

    },
    daira(n,o){
      
      if(n!=""){
        this.baladiyas = getBaladyiatsForDaira(n)
      }else{
        this.baladiyas = []
        this.baladiya=""
      }

    }
  },
  data(){
    return {
      price:0,
      immatricule:"",
      mark:"",
      model:"",
      type:"l",
      width:0,
      weight:0,
      city:"",
      volume:0,
      baladiya:"",
      wilaya:"",
      dairas:null,
      baladiyas:null,
      wilayas:getWilayaList(['name_ar','mattricule']),
      daira:"",
    }
  },
  mounted(){
    // console.log(this.$store.currentUser?.type);
    if(!this.$store.state.isAuth)  this.$router.push("/") 
    else if(this.$store.state.currentUser?.type == 0)   this.$router.push("/dashboard") 
    else if(this.$store.state.currentUser?.type == 1 && this.$store.state.currentUser?.d==false) this.$router.push("/orders") 
  }
}
</script>

<style scoped>
   .auth {
      height: max-content;
   }
  .form-inline {
    direction: rtl;
  }
</style>