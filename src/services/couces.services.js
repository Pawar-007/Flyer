import token from "./../../src/token.js";
const x=import.meta.env.VITE_SENDREQUEST;
async function ThoughtCorse(token) {
  try {
    
    const response = await fetch(`${x}/api2/v2/inst/thoughtCorse`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer : ${token}`
      },
      credentials: "include", // Ensures cookies are sent with the request
    });     
    if (!response.ok) {
      throw new Error(`HTTP error! Status:`);
    }
    
    const courses = response;
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}


async function createCourse(token,name,description,courseid,coverImage){
  try {
    const formData = new FormData();
    formData.append("courseName", name);
    formData.append("description", description);
    formData.append("courseId", courseid);
    formData.append("coverImage", coverImage);
    const addingCourse=await fetch(`${x}/api2/v2/inst/AddCourse`,{
      method:"POST",
      headers: {
        "Authorization":`Bearer : ${token}`
      },
      credentials: "include",
      body:formData
    })
    console.log("adding courese",addingCourse)
    return addingCourse;
  } catch (error) {
    return error;
  }
}
const addVideoTuto=async (token,courseId,videos, coverImages, descriptions)=>{
 const form=new FormData();
 form.append("courseId",courseId);
 videos.forEach((file, index) => {
  form.append(`video`, file);
  form.append(`image`, coverImages[index]); // Append cover images
  form.append(`description${index}`, descriptions[index]); // Append descriptions
});
try {
  const addedVideo=await fetch(`${x}/api2/v2/inst/add-course-video`,
  {
    method:"POST",
    headers: {
      "Authorization":`Bearer : ${token}`
    },
    credentials:"include",
    body:form

  })
  console.log("added videos",addedVideo);
  return addedVideo;
} catch (error) {
  return error;
}
}
const deleteVideoTut=async (courseId,url,imgpath)=>{
   try {
    console.log(courseId,url);
    const deleted=await fetch(`${x}/api2/v2/inst/deletecontent`,{
      method:"POST",
      headers:{
        "Authorization":`Bearer : ${token}`,
        "Content-Type": "application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        "url":url,
        "courseID":courseId,
        "coverImage":imgpath
      })
    })
    
    console.log("delete",deleted)
    return deleted
   } catch (error) {
     return error
   }
}
const addQuiz=async (quizdata)=>{
  try {
    const quizAdded=await fetch(`${x}/api2/v2/inst/add-quiz`,{
       method:"POST",
       headers: {
          "Content-Type": "application/json" 
      },
       body:JSON.stringify(quizdata)
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("user",user);
    return quizAdded;
  } catch (error) {
    console.error("Error adding quiz:", error);
    return error;
  }
}
const updatePage=async(courseId)=>{
  try {
    const ContentForUpdate=await fetch(`${x}/api2/v2/inst/returnVideo`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization":`${token}`
      },
      credentials:"include",
      body:JSON.stringify({
        "courseID":courseId
      })
    })
    return ContentForUpdate.json();
  } catch (error) {
    return error
  }
}

const addTest=async(courseId,quizdata)=>{
    try {
      const response=await fetch(`${x}/api2/v2/inst/add-test`,{
        method:"POST",
        headers:{
        "Authorization":`Bearer : ${token}`,
        "Content-Type": "application/json"
        },
        credentials:"include",
        body:JSON.stringify({
          "courseId":courseId,
          "newquiz":quizdata
        })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("response",response);
      return response;
    } catch (error) {
      return error
    }
}
const removeTest=async(courseId,testId)=>{
  try {
    const response=await fetch(`${x}/api2/v2/inst/delete-test`,{
      method:"POST",
      headers:{
      "Authorization":`Bearer : ${token}`,
      "Content-Type": "application/json"
      },
      credentials:"include",
      body:JSON.stringify({
        "courseId":courseId,
        "testId":testId
      })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("response",response);
    return response;
  } catch (error) {
    return error
  }
}
// /delete-course
const deleteCourse=async ({courseName,coverImage,_id,courseVideos})=>{
       try {
        const deletedCourse=await fetch(`${x}/api2/v2/inst/delete-course`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Authorization":`Bearer : ${token}`,
            "Content-Type": "application/json"
            },
            body:JSON.stringify({
              "courseName":courseName,
              "courseId":_id,
              "courseVideos":courseVideos,
              "coverImage":coverImage
            })
        })

        if(!deletedCourse.ok){
          console.log("coursedeleted",deleteCourse);
        }
        return deletedCourse;
       } catch (error) {
        return error
       }
}

const submitTest=async (selectOption,testId,CourseId)=>{
     try {
      //console.log("testId",testId, "selected option ",selectOption," courseid ",CourseId)
      const addTest=await fetch(`${x}/api2/v2/inst/submit-Test`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Authorization":`Bearer : ${token}`,
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          "selectedOption":selectOption,
          "id":testId,
          "courseId":CourseId
        })
      })
     
      return addTest;
     } catch (error) {
      return error;
     }
}

const getScore=async({courseId,testId})=>{
   try {
    const score=await fetch(`${x}/api2/v2/inst/get-score`,{
      method:"POST",
      credentials:"include",
      headers:{
        "Authorization":`Bearer : ${token}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "id":testId,
        "courseId":courseId
      })
    });
    return score;
     
   } catch (error) {
    return error;
   }
}
export 
{ ThoughtCorse,
  createCourse,
  addVideoTuto,
  deleteVideoTut,
  addTest,
  updatePage,
  removeTest,
  deleteCourse,
  submitTest,
  getScore
};
