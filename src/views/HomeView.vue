<template>
 
 <Navbar/>
  <Main/>
  <Service/>
  <application></application>
  <Footer/>
</template>

<script>
import Application from '../components/Application.vue';
import Footer from '../components/Footer.vue';
import Main from '../components/Main.vue';
import Navbar from '../components/Navbar.vue';
import Service from '../components/Service.vue';

export default {
    components: { Navbar, Main, Service, Application, Footer, Footer },
    mounted(){
      if(this.$store.state.isAuth){
        if(this.$store.state.currentUser?.type == 0)   this.$router.push("/dashboard") 
        if(this.$store.state.currentUser?.type == 1 && this.$store.state.currentUser?.d==true) this.$router.push("/orders") 
           else  this.$router.push("/truck/add") 

        }
    }
}
</script>

<style>

</style>