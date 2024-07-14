import { addDoc, collection,doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, storage } from "../../loli";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { extra_info_user } from "./auth";



const uploadFile= async(id,name,file)=>{
   try {
    let n = "trucks/"+name+"_"+id+".png"
    const storageRef = ref(storage, n);
    // let blob = file.slice(0,file.size,"image/png")
    // let filename = new File([blob],n,{type:"image/png"})
    
    const s =await uploadBytes(storageRef, file)
      if(s) return n

   } catch (error) {
      throw new Error(error)
   }
  


}

export const getAllTrucks = async (wilaya,type,...options)=> {

try {
   const q = await query(collection(db,"trucks"), where("location.wilaya", "==", parseInt(wilaya)))
   const docs = await (await  getDocs(q)).docs
  
   const onlyType = docs.filter((doc)=>doc.data().type == type).map(doc=>doc.data())
   
   
 

   let trucks =  onlyType.filter(async element => {
      

         switch (type) {
            case 'l':
               {if(element.volume>=options[0]){
                  
                  console.log("options ",options);
                  console.log("element ",element.volume);
               
                 return element
                  }   
               }
             case 'b':
            case 'v':
            {  if(element.weight>=options[1])
                  return element
                  
            }
            case 'bo':
            {   if(element.weight>=options[1] && element.width >= options[2])
                 return element
                 
            }
            default:
               return element
   
         }
  
   
   });
      return {s:true,trucks}
}
   catch (error) {
   console.log(error);
   return {s:false}
}


} 





export const addTRUCK = async (uid,file,truckInfo)=>{

    try {
        // console.log(ref(storage, 'images/photo.png').fullPath);
        //console.log(await uploadFile(uid,"truck",file));
        const url =await uploadFile(uid,"truck",file)
        await addDoc(collection(db, "trucks"),{
            uid:uid,
             ...truckInfo,
             "truckUrl":url
         })
      
         const docc = await extra_info_user(uid)
        //  console.log("docId",docId);
         await updateDoc(doc(db, 'users_info',docc.id),{
            d:false,
            active:true
         })
      
         return {s:true}

      }catch(error){
        console.log(error);
        return {s:false}
    
    }


} 