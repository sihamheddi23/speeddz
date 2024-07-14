<template>
  <navbar></navbar>


  <div class="auth p-2">
    <div class="container mx-lg-auto px-lg-auto px-md-2 mx-md-5  my-4 ">
    <form class="bg-light p-3   text-right" @submit.prevent="signup">
        <h3 class="text-center my-3">
            انشئ الحساب
        </h3>
        <div class="form-group">
            <label for="exampleInputEmail1">الايمايل</label>
            <input type="email" class="form-control" id="exampleInputEmail1"  v-model="email"  aria-describedby="emailHelp" placeholder="أدخل الايمايل " required>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">كلمة المرور</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password"  placeholder="أدخل كلمة المرور" required>
        </div>
        
        <div class="form-group">
            <label for="full">الاسم الكامل</label>
            <input type="text" class="form-control" id="full" aria-describedby="emailHelp" v-model="fullName"  placeholder="أدخل الاسم الكامل " required>
        </div>
        <div class="form-group">
            <label for="phone">رقم الهاتف</label>
            <input type="text" class="form-control" id="phone" v-model="phone" pattern="[0-9]+" placeholder="أدخل رقم الهاتف " required>
        </div>
        <div class="form-check mt-2">
            <label class="form-check-label mr-4" for="defaultCheck1">
                الزبون
            </label>
            <input class="form-check-input" type="radio" v-model="type"  value="0" name="type" id="defaultCheck1">

        </div>
        <div class="form-check mb-3">
            <label class="form-check-label mr-4" for="defaultCheck2">
                السائق
            </label>
            <input class="form-check-input" type="radio"  v-model="type" value="1" name="type"  id="defaultCheck2" >

        </div>
        <button type="submit" class="btn btn-primary container">تأكـــــــــيد</button>
   </form>
  </div>
  </div>

</template>

<script>
import {addUser, register} from "../backend_utilities/auth"

import Navbar from '../components/Navbar.vue'
export default {
  components: { Navbar},
  mounted(){
    if(this.$store.state.isAuth) this.$router.go(-1)

  }
  ,
  methods:{
      async signup(){
           if (this.fullName.trim()!="" && this.phone.trim()!="" && this.password.trim()!=""  && this.email.trim()!="") {
            let info =  await register(this.email,this.password)

            if (info){

                if(info.s ) {
                   // console.log("info",info.uid);     

                    info = await addUser(info.uid,this.fullName,this.phone,this.type)

                         //console.log("info2",info);     

                         if(info.s) {
                           
                            this.$toast.open({
                                message:'تم انشاء الحساب بنجاح ',
                                type: 'success',
                                position:"top"
                           });

                           setTimeout(() => {
                              this.$router.push("/login")
                           }, 1000);

                         } else {
                            // console.log("hi mr error2");
                            this.$toast.open({
                                message:'  السرفر لا يعمل  ',
                                type: 'error',
                                position:"top"
                           });
                            //console.log(info.error);
                         }
                    
                    } else {
                        // console.log("hi mr error");
                        // console.log(info.code);
                        if (info.code=="auth/weak-password") {
                            this.$toast.open({
                                message:'   كلمة المرور يجب ان تكون اكثر من ستة أحرف   ',
                                type: 'error',
                                position:"top"
                           });
                        }
                        if(info.code==="auth/email-already-in-use")
                        {
                             
                            this.$toast.open({
                                message:' الايمايل موجود مسبقا   ',
                                type: 'error',
                                position:"top"
                           });

                        }
                    }
            }
           }        
           else {
            this.$toast.open({
                message: 'أحد الحقول فارغة',
                type: 'error',
                position:"top"
            });
           }
    }
  }
  ,
  data(){
    return {
        type:0,
        fullName:"",
        phone:"",
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