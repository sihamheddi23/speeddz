import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage} from "../../loli";
import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { ref } from "firebase/storage";


export const isAuth = ()=> {
  return auth.currentUser;
}

export const addUser = async(uid,fullName,phone,type)=> {
      try {
        // console.log(ref(storage, 'images/photo.png').fullPath);
        await addDoc(collection(db, "users_info"),{
            "uid":uid,
             "photoUrl":ref(storage, 'images/photo.png').toString(),
              d:true,
              active:false,
            fullName,phone,type
         })

         return {s:true}

      }catch(error){

        return {s:false}
    
    }

}

export const extra_info_user = async(uid)=>{
   try {
    const q = await query(collection(db,"users_info"), where("uid", "==", uid))
        return await (await  getDocs(q)).docs[0].data()
      
   } catch (error) {
      console.log(error);
      throw new Error(error)

   }
}

export const login = async (email,password) => {
    try{
    const maybe = await signInWithEmailAndPassword(auth, email, password)
   
      if (maybe) {
        const u= await (await extra_info_user(maybe.user.uid))
        if(u) {
          return {s:true,d:u.d,type:u.type,m:maybe.user,u}

      }
    }}
    catch(error) {
        console.log(error.message);
        return {s:false,code:error.code}

    }
}

export const register = async(email,password) => {
    try {
        const maybe = await createUserWithEmailAndPassword(auth, email, password)
        if(maybe) {
          
            return {s:true,uid:maybe.user.uid}}
    } catch (error) {
        return {s:false,code:error.code}

    }
    
}

