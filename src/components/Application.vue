<template>
    <div class="mt-5 "></div>
  <div id="application" class=" mt-lg-5 mt-sm-5 mt-md-5 pt-lg-5 pt-sm-5 pt-md-5 text-center">
       <h1 class="app">
        حمل تطبيقنا الأن ماذا تنتظر ؟
       </h1>     
       <div class=" d-block d-sm-flex d-lg-flex d-md-flex justify-content-center my-lg-5 my-md-5 my-sm-5">
         <a href="#"  class="btn">
            <img src="../assets/image1.png" >
         </a>
         <a href="#" class="btn">
           <img src="../assets/image2.png" alt="">
         </a>
       </div> 
  </div>
</template>

<script>
export default {

}
</script>

<style>

.app {
    color: #353862;
    font-size: 2em;
}

@media (max-width: 576px) { 
    #application h1 {
      font-size: large;
    }
    #application a {
      display: block;
    }

}


</style>