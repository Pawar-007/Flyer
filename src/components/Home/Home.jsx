import React, { useEffect, useState } from 'react';
import image from '../../assets/e-learn-home.jpg'; // Ensure this path is correct
import '../../style/home.css';
import { useNavigate } from 'react-router-dom';
import contentImage from '../../assets/e-learn-content.jpg'
const service=import.meta.env.VITE_SENDREQUEST;

const courses=async ()=>{
  try {
    const response=await fetch(`${service}/api/v1/presentCourses`);
   if(!response.ok){
    throw new Error("network response is not okk")
   }

    const data=await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { data:[]};

  }
}
function subString(item){
  const maxLenght=80;
  if(item.length > maxLenght){
    return item.slice(0,maxLenght)+"..."
  }
  else{
    return item;
  }
}

function Home() {
  const [coursesData,setCoursesData]=useState({data:[]});
  const navigate = useNavigate();

  useEffect(()=>{
    const getCourse=async ()=>{
      const data=await courses();
      setCoursesData(data);
    }
    getCourse();
  },[])
   
function handleStart(item) {
    const courseData = item;
    // Save data to localStorage
    localStorage.setItem("courseData", JSON.stringify({
        id: courseData._id,
        image: courseData.coverImage,
        description: courseData.description,
        name: courseData.courseName
    }));

    navigate("/Start-course");
}

  return (
    <>
      <div className='bodyClass'>
        <div
          className='website_image'
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="card style_card" style={{ width:20+"rem"}}>
            <div className="card-body">
              <h3 className="card-title">lets start learning with FLYER </h3>
              <p className="card-text">It is the trustavle platform for study</p>
              <button>explore more</button>
            </div>
          </div>
        </div>
        
      </div>
      <div className='cources'>
          <div className="course_Heading" 
          >
            <h1>What to learn next</h1>
          </div>
          <div className='course_present'
          style={{ 
            backgroundImage: `url(${contentImage})`,
            backgroundSize: 'cover',        // Ensures the image covers the div
            backgroundPosition: 'center',   // Centers the image
            backgroundRepeat: 'no-repeat',  // Prevents image repeat
            width: '100%',                  // Adjust width to fit your container (optional)
            height: '500px'  
          }}>
          {
            coursesData?.data.map((items,index)=>(
              <div className=" course_card card" key={index} style={{width: 18+"rem" }}>
              <img src={items.coverImage} className="card-img-top" alt="coverImage"/>
              <div className="card-body">
              <h5 className="card-title">{items.courseName}</h5>
              <p className="card-text">{subString(items.description)}</p>
             <button className="btn btn-primary" onClick={e=>handleStart(items)}>Start</button>
       </div>
</div>
            ))
          }
          </div>
      </div>
    </>
  );
}

export default Home;
