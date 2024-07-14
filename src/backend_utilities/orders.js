import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../loli"



export const storeCodeOfTruck = async (code,id)=> {
    try {
        await addDoc(collection(db, "code_order"),{
           tid:id,
           code:code
           })
    } catch (error) {
        throw new Error(error);
    }
}

export const deliveredOrder = async (id)=> {
    try{
        if(await updateDoc(doc(db, 'order_trucks',id),{
             status:2,
        }))
        {
          
            const q = await query(collection(db,"code_order"), where("tid", "==", id))
            const cd =await  (await  getDocs(q)).docs[0].id
            if(cd) await deleteDoc(doc("code_order",cd))

        }

     } catch (error) {
        throw new Error(error);
       
     }
}


export const checkCode = async (code,id)=> {
    try {
        try {
            const q =  query(collection(db,"code_order"), where("tid", "==", id))
            const cd = await(await  getDocs(q)).docs
            console.log(cd[0].data().code);
            if(cd){
                if(cd[0].data().code==code)
                    return {s:true}
               else  return {s:false}   
             }
        
          
            } catch (error) {
              console.log(error);
              throw new Error(error)
        
           }
    } catch (error) {
        console.log(error);
    }
}

 
 

export const acceptingOrder=async (id)=>{
    try{
       await updateDoc(doc(db, 'order_trucks',id),{
            status:1,
       })
    } catch (error) {
       throw new Error(error);
      
    }
}

export const rejectedAllOrders= async (uid)=>{
    try {
        const q = await query(collection(db,"order_trucks"), where("driver_info.uid", "==", uid),where("status","==",0))
        const docs= await (await  getDocs(q)).docs
        if(docs) docs.forEach(async doc => {
            await updateDoc(doc.ref,{status:-1})
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);

    }
}


export const getOrderForClient= async (uid)=>{
    try {
        const q = await query(collection(db,"order_trucks"), where("client_info.uid", "==", uid),where("status","in",[0,1]))
        const docs = await (await  getDocs(q)).docs
         if(docs.length>0) return {s:true,order:{...(docs[0].data()),id:docs[0].id},}
         else return {s:false}
        } catch (error) {
          console.log(error);
          throw new Error(error)
    
       }
}


export const getOrdersForDriver= async (uid)=>{
    try {
        const q = await query(collection(db,"order_trucks"), where("driver_info.uid", "==", uid),where("status","in",[0,1]))
        const docs= await (await  getDocs(q)).docs
          if(docs) {
           return  docs.map(doc=> {return {...(doc.data()),id:doc.id}})
          }
       } catch (error) {
          console.log(error);
          throw new Error(error)
    
       }
}


export const addOrderTruck = async (order)=>{
    try {
        const o =await addDoc(collection(db, "order_trucks"),{
          ...order
         })
        if (o) return {s:true}

    } catch (error) {
        console.log(error);
       return {s:false}
    }
 }