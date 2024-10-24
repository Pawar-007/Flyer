import React from 'react';
import { useState } from 'react';
import './newCourse.css';
import {createCourse} from '../../services/couces.services.js'
import { ContextCourse } from '../../contex/newCourseContext.jsx';
function NewCourse() {
   const [name,setName]=useState("");
   const [description,setDescription]=useState("");
   const [courseid,setcourseid]=useState("");
   const [selectedFile, setSelectedFile] = useState(null);
   const [newCourseAdd, setNewCourseAdd]=React.useContext(ContextCourse);
   
   const handleName=(e)=>{
      setName(e.target.value);
      console.log(e.target.value)
   }
   const handledescription=(e)=>{
      setDescription(e.target.value);
      console.log(e.target.value)
   }
   const handlecourseid=(e)=>{
      setcourseid(e.target.value);
      console.log(e.target.value)
   }
   const handleSubmition=async (e)=>{
      e.preventDefault();
      const token=localStorage.getItem("Token");
      if (!name.trim() || !description.trim() || !courseid.trim() || !selectedFile) {
         alert("All fields are required!");
         return; // Prevent further action if fields are empty
       }
      
    try {
      const response = await createCourse(token,name, description, courseid, selectedFile);

      if (!response.ok) { // Check if the response status is not OK
         throw new Error(`HTTP error! status: ${response.status}`);
       }

      const data = await response.json(); // Await JSON parsing
      console.log(data);
      alert("Course added successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding course");
    }
  };
   const handleCoverImage=(e)=>{
      const path=e.target.files[0];
      setSelectedFile(path);
      console.log(path)
   }
  return (
    <div>
      <div className="create-course">
      <button id='close-button' onClick={()=>setNewCourseAdd(!newCourseAdd)}>x</button>
         <div className='course-name'>
            <label htmlFor="course name">enter course name</label>
            <input type="text" placeholder='Enter course name'value={name}
            onChange={handleName}/>
         </div>
         <div className='course-name'>
            <label htmlFor="course name">enter course discription</label>
            <textarea type="text" placeholder='Enter course name' value={description}
            onChange={handledescription}/>
         </div>
         <div className='course-name'>
            <label htmlFor="course name">Course id</label>
            <input type="text" placeholder='Enter course id' value={courseid}
              onChange={handlecourseid}
            />
         </div>
         <div className='course-name'>
            <label htmlFor="course name">Set coverImage</label>
            <input type="file" placeholder='Enter course name'
              onChange={handleCoverImage}
            />
         </div>
      </div>   
      <button type='button' onClick={handleSubmition}>add course</button>
    </div>
  )
}

export default NewCourse
