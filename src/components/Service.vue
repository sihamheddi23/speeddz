<template>
  <div id="service" class="text-center pb-5 mb-4">
        
     <h1 class="pl-3 pl-lg-0 ml-sm-5 ml-md-5 ">
        خدمـــاتنـــا الرقمـــية 
     </h1>
     <div class="container my-5">
  <div class="row mx-5 mx-lg-0 ml-md-5 pl-md-5">
    <div class="col-12  col-lg-5 col-sm-12 col-md-12  border  border-secondary bg-light mr-5">
        <i class="bi bi-truck "></i>
        <p>
            استئجار الشاحنة            
        </p>
    </div>
    <div class="col-12 col-lg-5 col-sm-12 col-md-12   mr-lg-0 border  border-secondary bg-light mt-5 mt-lg-0 mt-md-5 mt-sm-5">
        <i class="bi bi-map"></i>
        <p>
            نقل و تتبع حركة السلع
        </p>
    </div>
   
    <div class="col-12  col-lg-5 col-sm-12 col-md-12  border  border-secondary bg-light mt-5 mr-5">
        <i class="bi bi-person"></i>  
        <p>
            التسجيل كسائق
        </p>
    </div>
    <div class="col-12 col-lg-5 col-sm-12 col-md-12  border  border-secondary bg-light mt-5">
        <i class="bi bi-house"></i>
            <p> 
            نقل المنازل و المكاتب و المتاجر 
            </p>
        </div>
  </div>
</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  #service {
    background-color: #F2F2F2;
   padding-top: 7em;

 }
 #service h1 {
    color: #353862;
 }
 #service .container {
 color: #3D337B;
 font-size: 2em;
 }
 
 #service .container i{
    font-size:2.4em;

 } 

 .bg-light{
    background-color: white !important;
 }
 .border-secondary{
      border-color:#afbbd1b6 !important;
 }
 @media (max-width: 576px) { 
  #service .container {

 font-size:1em;
 }
 #service h1 {
  font-size: large;
 }
  }
</style>