<template>
  <div id="footer">

   <div class="d-flex flex-column align-items-center pt-md-5 pt-sm-5 pt-lg-5 text-light">
    <div class="logo mt-5 pt-4">
        <img src="../assets/logo_home.png" alt="logo">
   </div>
    
  

      <div class="d-flex contact">
       
        <a href="#">
            <div>
              <i class="bi bi-facebook"></i>
            </div>
        </a>
      
        <a href="#">
            <div class="twitter">
                <i class="bi bi-twitter"></i>
            </div>
        </a>
       
        <a href="#">
            <div class="instgram">
                <i class="bi bi-instagram"></i>
            </div>
       </a>

       <a href="#">
            <div class="text-light">
                <i class="bi bi-linkedin"></i>
            </div>
       </a>
     
       <!-- <p>
        <i class="bi bi-telephone-fill"></i> +000000   </p>-->
     
      </div>
      
      <p class="mt-3">
        Created By Siham heddi  <i class="bi bi-suit-heart-fill text-danger"></i> 2022-2023
      </p>

   </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#footer .logo img {
   width: 9em !important;
}
#footer {
    margin-bottom: 0;
    background-image: url('../assets/wave.png');
    width: 100%;
    height: 47vh;
    background-repeat: no-repeat;
    background-size: cover;

}
.contact {
    gap: 1em;
    font-size:2em
}

.twitter{
    color: rgb(77, 181, 219);
}

.instgram {
    color: rgb(235, 42, 228);
}

@media (max-width: 576px) {
    #footer {
        height: 40vh;
        background-color: rgb(17, 17, 44);
        background-image: none;
    }
 }
 @media (max-width: 435px) {
    #footer {
        height: 40vh;
     
    }
    #footer .logo img {
   width: 7em !important;
}
 }
</style>