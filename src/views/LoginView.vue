<template>
    <navbar></navbar>
    <div class="auth p-2">
      <div class="container mx-lg-auto px-lg-auto px-md-2 mx-md-5  my-4 ">
      <form class="bg-light p-3  text-right" @submit.prevent="signin">
          <h3 class="text-center my-3">
              تسجيل الدخول
          </h3>
          <div class="form-group">
              <label for="exampleInputEmail1">الايمايل</label>
              <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="أدخل الايمايل " required>
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">كلمة المرور</label>
              <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="أدخل كلمة المرور" required>
          </div>
          <button type="submit" class="btn btn-primary container">تأكـــــــــيد</button>

     </form>
    </div>
    </div>
  
  </template>
  
  <script>
import { login } from '../backend_utilities/auth'
import { getOrderForClient } from '../backend_utilities/orders'
  import Footer from '../components/Footer.vue'
  import Navbar from '../components/Navbar.vue'
  export default {
    components: { Navbar, Footer },
    mounted(){
       if(this.$store.state.isAuth) this.$router.go(-1)
    },
    methods:{
        async signin(){
           if (this.email.trim()!="" && this.password.trim()!="") {
              const info = await login(this.email,this.password)
              
              if(info){
                 if(info.s){
                     this.$store.commit("setAuth",{isAuth:true,currentUser:{...info.m,...info.u}})     
                    if(info.type=="1") {
                      if(info.d)  this.$router.push("/truck/add")
                      else  this.$router.push("/orders")
                    }
                    else {
                        // const order1 = await getOrderForClient(info.u.uid)
                        // if(order1) {
                            this.$router.push("/dashboard")

                        // }
                }
               }
                else {
                    //console.log(info.code);
                    if(info.code="auth/wrong-password"){
                        this.$toast.open({
                                message:'لقد أخطئت في كلمة المرور',
                                type: 'error',
                                position:"top"
                           })
                    }
                    if(info.code="auth/user-not-found"){
                        this.$toast.open({
                                message:'لقد اخطئت في الايمايل',
                                type: 'error',
                                position:"top"
                           })
                    }
                   
                }
              }
            }
        }
    },
    data(){
        return {
            email:"",
            password:""
        }
    }
  }
  </script>
  
  <style >
  .auth {
      background-color: #F2F2F2;
      padding: 0;
      margin:0;
      height:100vh;
  
  }
  input::placeholder {
     text-align: right;
  }
  </style>