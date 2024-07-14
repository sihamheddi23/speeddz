<template>

  <navbar></navbar>
   <download-page v-if="loding"></download-page>
   <div v-else>
        <your-order v-if="o?.status==0"></your-order>
      <div  v-else-if="o?.status==1"  class="auth pt-4">
        <Step :order="o"/>

      </div>
      <div class="auth pt-1 " v-else>
        <div  class="input-group  mb-3 container mt-3 bg-light p-3 mx-auto">
              <div class="input-group-prepend w-100">
                <button class="btn btn-outline-secondary"  @click="search" data-toggle="search" data-placement="top" title=" ابحث" type="button"><i class="bi bi-search"></i></button>
                <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal" type="button" data-placement="top" title="البحث المتقدم"><i class="bi bi-funnel"></i></button>
                <input type="search"  class="form-control place-search-input" placeholder="ادخل موقعك الحالي"  aria-label="" aria-describedby="basic-addon1" v-model="location">

              </div>
              <div class="input-group-prepend w-100 my-2 " v-show="selected">
                <button class="btn btn-info mr-3" data-toggle="modal" data-target="#facteur" v-show="this.markerDest">
                  انطلق
                </button>
                <button class="btn btn-outline-secondary"  @click="search2" data-toggle="search" data-placement="top" title=" ابحث" type="button"><i class="bi bi-search"></i></button>
                <input type="search"  class="form-control place-search-input2" placeholder="ادخل  الوجهة"  aria-label="" aria-describedby="basic-addon1" v-model="destination">

              </div>
          </div>

          <div id="map" class="container mt-4"  style="width: 100%; height: 65vh;">
          </div>

              <!-- Modal -->
              <div class="modal fade text-right" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">البحث المتقدم</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                          <div class="form-group">
                              <label for="exampleFormControlSelect1">نوع الأشياء</label>
                              <select class="form-control" id="exampleFormControlSelect1" v-model="type">
                                  <option value="l" >السوائل</option>
                                  <option value="b">مواد البناء</option>
                                  <option value="bo">العلب</option>
                                  <option value="v">السيارات</option>
                              </select>
                        </div>
                        <div class="form-group "   v-show="type=='l'">
                            <label for="volume"> السعة </label>
                            <input type="number" class="form-control " id="volume" v-model="volume"  placeholder="السعة (لتر)  " required >
                        </div>
                        <div class="form-group "   v-show="type!='l'">
                            <label for="weight">وزن الأشياء </label>
                            <input type="number" class="form-control " id="weight" v-model="weight"  placeholder="وزن (كلغ)  " required >
                        </div>
                        <div class="form-group "  v-show="type=='bo'">
                          <label for="width">طول الأشياء </label>
                          <input type="number" class="form-control" id="width" v-model="width" placeholder="طول  (متر) " required >
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>


              <!--  truck details -->
            
            <div class="modal fade text-right"  v-for="t in trucks"  :id="'truckInfo_'+t.uid" :key="t.index" tabindex="-1" aria-labelledby="truckInfo" aria-hidden="true">
                <div class="modal-dialog"  >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">{{ t.model }} {{ t.mark }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      
                      <img :src="t.truckUrl" style="width:100%;height: 10em;"/>
                      
                      <div class="d-flex flex-column">
                        
                        <h4 class="my-3"> رقم الشاحنة {{ t.immatricule }}</h4>
                        <p> <b>اسم السائق</b> <span v-if="t.user">{{t.user.fullName}}</span> <span v-else>... التحميل</span> </p>
                        <p>  <b>رقم الهاتف</b> <span v-if="t.user">{{ t.user.phone }}</span> <span v-else> .... التحميل</span></p>
                        <p> <b>مبلغ الشحن (1 كلم)</b>{{ t.price }}</p>

                        <button  v-show="selected==null" @click="()=>selectTruck(t.truckUrl,t.uid,t.location,t.model,t.mark,t.price,t.immatricule)" class="container mt-3 btn btn-info">
                              اختر
                        </button>
                        <button  v-show="selected && selected?.uid == t.uid " @click="cancelOrder" class="container mt-3 btn btn-danger">
                              الغاء
                        </button>
                      </div>

                    </div>
                    
                  </div>
                </div>
              </div>
          
          

                <!--  facteur details -->

              <div  class="modal fade text-right"  id="facteur" tabindex="-1" aria-labelledby="truckInfo" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">فاتورة </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            
                            <img :src="selected?.truck.url" style="width:100%;height: 10em;"/>
                            
                            <div class="d-flex flex-column">
                              
                              <h4 class="my-3"> اسم الشاحنة {{selected?.truck.name }}</h4>
                              <div v-if="routes.length>0">

                                  <p><b>المسافة 1 المقطوعة</b>- {{routes[0].distance }} -  <b>المبلغ  </b> -  {{routes[0].price.toFixed(2)}} -  <b>الزمن المستغرق   </b>  {{routes[0].timeString}} - </p>
                                  <p><b>المسافة 2 المقطوعة</b>-  {{routes[1].distance}} -  <b>المبلغ  </b> - {{routes[1].price.toFixed(2)}} -  <b>الزمن المستغرق </b> - {{routes[1].timeString}} </p>
                            
                          
                                  <p><b>  المبلغ الكلي </b> {{ totalPrice }}</p>
                              </div>
                              <button  class="container mt-3 btn btn-info" @click="orderTruck">
                                    تأكيد الطلب
                              </button>
                      
                            </div>

                          </div>
                          
                        </div>
                      </div>
              </div>


      </div>
   </div>
 
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue'
import { getAllTrucks } from '../backend_utilities/trucks';
import { getDownloadURL, ref } from 'firebase/storage';
import { extra_info_user } from '../backend_utilities/auth';
import { addOrderTruck, getOrderForClient } from '../backend_utilities/orders';

import { storage } from '../../loli';
import YourOrder from '../components/orders/yourOrder.vue';
import DownloadPage from '../components/orders/DownloadPage.vue';
import Step from '../components/orders/Step.vue';
export default {
  components: { Navbar, YourOrder, DownloadPage, Step },
  
  computed:{
    loading(){
      return this.$store.state.isLoading
    },
   
    totalPrice(){
        return this.routes[0].price.toFixed(2)+this.routes[1].price.toFixed(2)
    }
  },
  data(){
    return {

      markers:[],
      loding:true,
      map:null,
      location:'',
      markerDest:null,
      trucks:[],
      destination:"",
      destLngLat:[],
      width:0,
      weight:0,
      volume:0,
      type:"l",
      locLatlng:null,
      routes:[],
      selected:null,
      o:null
   
    }
  }, 
    watch:{
      order(){
        console.log("kkssk sksk");
        this.loading = this.$store.state.loading
      }
    },
  methods:{
 
    async orderTruck(){
      try {
                const order = {}
              let{fullName,phone,photoUrl} = await extra_info_user(this.selected.uid)
        
              console.log(this.selected.name);
        
               if(fullName && phone && photoUrl){
                order.driver_info = {fullName,phone,uid:this.selected.uid,photoUrl,truck:{name:this.selected.truck.name,immatricule:this.selected.truck.immatricule,url:this.selected.truck.url}}
            
                const {fullName:fullName1,phone:phone1,photoUrl:photoUrl1} = await extra_info_user(this.$store.state.currentUser.uid)
              if(fullName1 && phone1 && photoUrl1) 
              {
                    order.client_info = {
                    fullName:fullName1,
                    phone:phone1,
                    uid:this.$store.state.currentUser.uid,
                    photoUrl:photoUrl1,
                  }
                
                  order.routes = this.routes

                  order.status = 0
                  const info = await addOrderTruck(order)
              
                  if(info.s) {
                    this.$toast.open({
                                                message:'   لقد تم تسجيل على طلبك يرجى الانتظار قليلا ليتم الرد ',
                                                type: 'info',
                                                position:"top"
                                          }) 
                   const order = await getOrderForClient(this.$store.state.currentUser.uid)
                    console.log(order);
                    if (order) {
                        this.o = order
                    
                            this.$store.commit("setOrder",order)
                           this.$refs.close.click()
                           setTimeout(() => {
                                window.location.reload()
                            }, 4000);
                    }
                    
                   }  
                    else this.$toast.open({
                          message:'السرفر لا يعمل',
                          type:"error",
                          position:"top"
                          }) 
              }}
              // else {
              //   console.log("something error happened1");
              // }
              
              // }
              // else console.log("something error happened2");
              
   

      }catch(error){
        console.log(error);
      }
    
      

      },
   async getInfoRoute(loc,dest){
    try {
      let route = await axios.get("https://www.mapquestapi.com/directions/v2/route",{
                    params:{
                      key:"i3sErUFFwFzmB9Mx1RLT4Up3TZuQFPTP",
                      from:loc,
                      to:dest
                    }});
     if(route) return route.data.route
    } catch (error) {
         throw new Error(error)      
    }


    },
   async search2(){
      if(this.markerDest) { 
      
        this.map.removeLayer(this.markerDest) 
        this.markerDest = null
      
      }

      let marker = null

      const lookForlocation = await axios.get("https://www.mapquestapi.com/geocoding/v1/address",{
                    params:{
                      key:"i3sErUFFwFzmB9Mx1RLT4Up3TZuQFPTP",
                      location:this.destination
                    }});
      
      if(lookForlocation?.data?.results?.length>0) {
            this.destLngLat  = [lookForlocation.data.results[0].locations[0].latLng.lat
            ,lookForlocation.data.results[0].locations[0].latLng.lng]       
            
            marker = window.L.mapquest.textMarker(this.destLngLat,{
                                text:"الوجهة",  
                                  position: 'top',
                                  type: 'circle',
                                  icon: {primaryColor: '#FF0060',
                                  secondaryColor: '#FF0060'},
                              }).addTo(this.map);
                            
          this.markers.push(marker)

          
          const dest = `${this.selected.location.daira}, ${this.selected.location.baladiya} , ${this.selected.location.city}, algeria`
         
          this.routes = []
          
     
          const r = await this.getInfoRoute(this.location,dest)
          const r1 = await this.getInfoRoute(this.destination,this.location)

          if(r && r1){
            
            this.routes.push({
              to:{
                  adress:this.location,
                  latlang:this.locLatlng
              },
              from:{
                adress:dest,
                latlang:this.selected.location.latlang
              },
              distance:r.distance,
              timeNumber:r.realTime,
              timeString:r.formattedTime,
              price:this.selected.truck.price*r.distance
            })

            this.routes.push({
              from:{
                adress:this.location,
                latlang:this.locLatlng
              },
              to:{
                adress:this.destination,
                latlang:{
                  lat:this.destLngLat[0],
                  lng:this.destLngLat[1]
                }
              },
              
              distance:r1.distance,
              timeNumber:r1.realTime,
              timeString:r1.formattedTime,
              price:this.selected.truck.price*r1.distance
            })

          }              



          this.markerDest = marker
       
     }
      
    },
    selectTruck(url,id,location,mark,model,price,matricule){
       this.selected = {}
       this.selected.uid = id
       this.selected.location = location 
       this.selected.truck = {
         name:`${mark} ${model}`,
         price:price,
         immatricule:matricule,
         url:url
       }
      },
    cancelOrder(){
        this.selected = null
        this.map.removeLayer(this.markerDest) 
        this.markerDest = null

    },
    async search(){
      if(this.location == "")
          this.$toast.open({
                                    message:'من فصلك ادخل موقعك الحالي',
                                    type: 'warning',
                                    position:"top"
                              })
      else {

        for (let i = 0; i < this.markers.length; i++) {
              this.map.removeLayer(this.markers[i]);
            }
        
            const lookForlocation = await axios.get("https://www.mapquestapi.com/geocoding/v1/address",{
                    params:{
                      key:"i3sErUFFwFzmB9Mx1RLT4Up3TZuQFPTP",
                      location:this.location
                    }
                  
                    });
            this.locLatlng = lookForlocation.data.results[0].locations[0].latLng
            const t = await getAllTrucks(lookForlocation.data.results[0].locations[0].adminArea3,this.type,this.volume,this.weight,this.width)
            if(t.s){
                  if (t.trucks.length==0) {
                    this.$toast.open({
                                          message:'لايوجد شاحنات بهذه المواصفات من موقعك الحالي',
                                          type: 'info',
                                          position:"top"
                                      })
                  }
                  else {
                      let marker = null
                      let refStorage = null
                      t.trucks.forEach(async element => {
                     
                        refStorage =  ref(storage,element.truckUrl)
                     
                        element.truckUrl = await getDownloadURL(refStorage)
                        element.user = await extra_info_user(element.uid)
                        
                        marker = window.L.mapquest.textMarker([element.location.latlang.lat,element.location.latlang.lng],{
                          text:"شاحنة",  
                            position: 'top',
                            type: 'circle',
                            icon: {primaryColor: '#22407F',
                            secondaryColor: '#3B5998'},
                        }).addTo(this.map);
                       
                        this.markers.push(marker)
                        
                       marker.on('click',(e)=>{

                            window.L.popup({ closeButton: true })
                                .setLatLng(e.target._latlng)
                                .setContent('<center><img src="'+element.truckUrl+'" style="width:5em"/><br><button  class=" btn btn-link" data-toggle="modal" data-target="#truckInfo_'+element.uid+'">More details </button></center>')
                                .openOn(this.map);
                          })

                         if(element.truckUrl && element.user) this.trucks.push(element)

                      })
                   
                    
                    }
                   
                    window.L.mapquest.geocoding().geocode(this.location)}
            else {
              this.$toast.open({
              message:'السرفر لا يعمل',
              type:"error",
              position:"top"
              })
            }
      }
   
  
  
  },
    initialise (){
      window.L.mapquest.key = 'i3sErUFFwFzmB9Mx1RLT4Up3TZuQFPTP';

      // 'map' refers to a <div> element with the ID map
      this.map=window.L.mapquest.map('map', {
        center: [28.0339, 1.6596],
        layers: window.L.mapquest.tileLayer('map'),
        zoom: 5
      });
      placeSearch({
      key: 'i3sErUFFwFzmB9Mx1RLT4Up3TZuQFPTP',
      container: document.querySelector('.place-search-input')
      });
      placeSearch({
      key: 'i3sErUFFwFzmB9Mx1RLT4Up3TZuQFPTP',
      container: document.querySelector('.place-search-input2')
      });
    }
  },
   mounted(){
   

     if(this.$store.state.isAuth){
        if(this.$store.state.currentUser?.type == 1){
          if(this.$store.state.currentUser?.d==true) {
            this.$router.push("/orders")
          
          } 
     
          else  this.$router.push("/truck/add") 
        }
 
      }
        else  this.$router.push("/")  
        
       
        // this.o = this.$store.state.orders
         getOrderForClient(this.$store.state.currentUser.uid).then(res=>{
          this.loding = false 

          if(res.s){
            this.o = res.order
                console.log("khra ta3 order",this.o);
                this.$store.commit("setOrder",order)
          }else{
           setTimeout(() => {
            this.initialise();
           }, 1000);

          }

         })
         .catch(err=>console.log(err))
   

    }

}
</script>

<style scoped>
   .modal {
    direction: rtl !important;
   }
  .place-search-input,.place-search-input2{
      height: fit-content !important;
      z-index:20;
  }
  #map{
    z-index: 10;
  }
</style>