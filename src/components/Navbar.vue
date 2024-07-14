<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class=" d-xl-none d-lg-none navbar-brand  d-sm-block mx-auto" to="/">
       <div class="logo">
        <img src="../assets/logo_home.png" alt="logo">
       </div>
    </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse " id="navbarSupportedContent">
    <ul class="navbar-nav mx-auto align-items-end mr-md-4 " >
     <li class="nav-item mr-lg-4">

        <router-link class="nav-link d-lg-none " to="/login" v-show="!isAuth"> تسجيل الدخول <i class="bi bi-person"></i></router-link>
      </li>
      <li class="nav-item ">
        <router-link class="nav-link  d-lg-none " to="/register"  v-show="!isAuth"> أنشئ الحساب <i class="bi bi-person-add"></i></router-link>
      </li>
      <li class="nav-item ">

        <router-link class="nav-link" to="#" v-show="!isAuth"> تغيير اللغة <i class="bi bi-translate"></i></router-link>
      </li>
      <li class="d-none nav-item ml-4 mr-lg-2 d-lg-block d-sm-none d-md-none">
        <router-link class="btn btn-primary" to="/login"  v-show="!isAuth">تسجيل الدخول <i class="bi bi-person"></i></router-link>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-primary"   v-show="isAuth" @click="deconnecter">تسجيل الخروج <i class="bi bi-door"></i></button>

      </li>
      <li class="d-none nav-item mr-lg-4 d-md-none d-sm-none d-lg-block">

        <router-link class="btn btn-outline-primary" to="/register"  v-show="!isAuth">أنشئ الحساب <i class="bi bi-person-add"></i></router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/account"  v-if="isAuth">حسابك الشخصي <i class="bi bi-person"></i></router-link>

        <a class="nav-link" href="/#application"  v-else>حمل التطبيق <i class="bi bi-phone"></i></a>
      </li>
      <li class="nav-item  ">
        <a class="nav-link" href="/#service"  v-show="!isAuth">خدماتنا <i class="bi bi-hdd-rack"></i></a>
      </li>
      <li class="nav-item mr-lg-5">
        <router-link class="nav-link" to="/dashboard"  v-if="isAuth && userType == 0">الصفحة الرئيسية <i class="bi bi-house-door"></i></router-link>
        <a class="nav-link" href="/#main"  v-show="!isAuth">الصفحة الرئيسية <i class="bi bi-house-door"></i></a>
      </li>
     
   
    </ul>
    <router-link class="d-none navbar-brand d-md-none d-sm-none d-lg-block" to="/">
       <div class="logo">
        <img src="../assets/logo_home.png" alt="logo">
       </div>
    </router-link>
  </div>
</nav>
</template>

<script>
import { isAuth } from '../backend_utilities/auth'
export default {
  mounted(){
  //   setTimeout(() => {
  //   //   this.isAuth = this.$store.state.isAuth
  //   //   console.log(this.$store.state.isAuth);
  //   //   console.log(isAuth());
  //   // }, 1000);
 
    // this.userType=this.$store.state.currentUser.type ;
    // this.d = this.$store.state?.currentUser?.d || true
    // console.log(  this.d);
    
    this.userType = this.$store.state.currentUser?.type 
   console.log(  this.userType);

  
  },

  // watch:{
  //   '$store.state?.currentUser?.d '(n){
  //      this.d = n
  //   }
  // },
   methods:{
     deconnecter(){
      this.$store.commit("disconnect")
      this.$router.push("/login")
    
     }
   },
  data(){
    return {
      isAuth:this.$store.state.isAuth,
      userType:-1,
      d:true
    }
  }
}
</script>

<style>
  .btn-primary{
    background-color: #62A7C5;
  }
  .btn-primary:hover{
    background-color: #4a8ca8;
  }
  .btn-outline-primary:hover{
    color: #144256 !important;
    border-color: #144256;
    background-color: white !important;
  }
  .logo img {
   width: 5em !important;
  }
  .navbar-light{
    background-color: white !important;
  }
</style>