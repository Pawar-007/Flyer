import token from "../token.js"

const enrolement=async (courseId)=>{
   try {
      const enrole=await fetch("http://localhost:8000/api/v1/enrole",{
         method:"POST",
         credentials:"include",
         headers:{
            "Authorization":`Bearer : ${token}`,
            "content-Type": "application/json"
         },
         body:JSON.stringify({
            courseId:courseId
         })
      })
      console.log("enrolement",enrole);
      return enrole;
   } catch (error) {
      return error;
   }
}
const courseContent=async(courseId)=>{
   try {
      const content = await fetch("http://localhost:8000/api/v1/course_detail",{
      method:"POST",
      headers:{
         "Authorization":`${token}`,
        "Content-Type": "application/json"
      },
      credentials:"include",
      body:JSON.stringify({
         courseId:courseId
      })
   })
   return content
   } catch (error) {
      return error
   }
}
export {courseContent,enrolement}