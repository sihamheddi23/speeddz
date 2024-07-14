<template>
  <div class="main py-5 " id="main">
       <h2 class="mt-auto mt-lg-5 pt-lg-2 py-md-auto mt-md-auto ">نقل و شحن سلع اصبح سهلا مع</h2>
       <h1 class=" mb-auto m-lg-0 mb-md-auto  mb-sm-auto ">سبيد ديزاد</h1>
       <p class="d-none m-5 d-md-none d-sm-none d-lg-block">يوفر سبيد ديزاد لزبائنه خدمة نقل و تتبع حركة السلع  والشحنات و ايضا المنازل المكاتب  و المتا جر من أجل المراقبة الفعالة في وقتها ، قصد تحسين كفاءة عمليات التسليم و القضاء على مشاكل الموجودة في القطاع اللوجيستي,</p>
        
       <h2 class="d-none mazid mt-5 d-md-none d-sm-none  d-lg-block">
            <a href="#service" class="d-flex" >
                <i class="bi bi-arrow-down-circle mt-1 mr-3"></i>

               المـــــزيـــــد
           </a>
        </h2>
     
 </div>
</template>

<script>
export default {

}
</script>

<style>
body{
    overflow-x: hidden;
}
.main{
    color:white;
    background: linear-gradient(90deg, rgba(6,21,28,0.3113620448179272) 22%, rgba(6,31,36,0.7063200280112045) 48%, rgba(3,0,46,0.3925945378151261) 100%),url('../assets/main.png');
    width: 100vw;
    height: 100vh;
    
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;

    align-items: center;
}
.main p {
    font-size: 1.2em;
    text-align: center;
    color: #BEBABA;
}
.main h2 {
    font-weight: 400;
    font-size:3em;
}
.main h1 {
    font-weight: 700;
    font-size: 4em;
    color: #A7BDEA;
}
.mazid a{
    font-size:3rem;
    color: white;
    font-weight: bold;
}
.mazid a:hover {
    text-decoration: none !important;

}
@media (max-width: 991.98px) { 
    .main h1 {
        font-size: 3em;

    }
    .main h2 {
    font-weight: 400;
    font-size:2em;
  }
  .main {
    height: 60vh;
  }
 }
 @media (max-width: 576px) { 
    .main h1 {
        font-size: 2em;

    }
    .main h2 {
    font-weight: 400;
    font-size:1em;
  }
  .main {
    height: 40vh;
  }
  }
</style>