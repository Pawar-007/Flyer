import React, { useEffect, useState,useContext } from 'react'
import { json, Outlet, useActionData, useLocation, useNavigate } from 'react-router-dom'
import {courseContent} from './../../services/user.services.js'
import { enrolement } from './../../services/user.services.js'
import { UserContext } from '../../contex/userContext.js'
import StartTest from '../instructor/startTest.jsx'
import { getScore } from '../../services/couces.services.js'
import './start.css'
function Enrolement(){
   const data=JSON.parse(localStorage.getItem("courseData"));

   const id=data.id;
   const img=data.image;
   const discription=data.description;
   const coursename=data.name;

  async function handleEnrolement(e){
     try {
      const temp=await enrolement(id);
      const data=await temp.json();
      if(temp.ok==true){
         alert("enrolement is successfully done");
      }
      else{
         alert("invalid credintial");
      }
     } catch (error) {
        console.error(error)
     }
   }
   return(
      <div className='enr-card' >
         <div className="course-img">
            <img className='cov-img' src={img} alt="image" />
         </div>
         <div className="enr-dis">
            <div> {coursename}</div>
            <div>{discription}</div>
         </div>
         <div className="enr-but">
            <button onClick={e=>handleEnrolement(e)}>Enrole here</button>
         </div>
    </div>
  );
}


import './LoginFirst.css'; // Import the CSS file
import { Link } from 'react-router-dom';
function LoginFirst() {
  return (
    <div className="loginFirst-container">
      <div className="loginFirst-message">
        <h1 className="loginFirst-title">Access Restricted</h1>
        <p className="loginFirst-text">
          You need to be logged in to view this page.
        </p>
        <Link to="/login" className="loginFirst-button" aria-label="Go to Login Page">Login</Link>
      </div>
    </div>
  );
}


function StartTutorial() {
  const location=useLocation();
  const [course_Id,setcourseID]=useState('');
  const [courseData,setCourseData]=useState('');
  let [latestvideo,setLatest]=useState([]);
  let [currentVideo,setCurrent]=useState(null);
  const [videoKey,setVideoKey]=useState(0);
  const [enrole,setEnrolement]=useState(false);
  const [isLoggedIn, setIsLoggedIn]=useContext(UserContext);
  const [test,setTest]=useState('');
  const navigate=useNavigate();
  const [loading,isLoading]=useState(false);
  function changeVideo(item,index){
   setCurrent(item);
   setVideoKey(index+1);
  }
  useEffect(()=>{
     const fetchCourseContent=async ()=>{
      const savedData = JSON.parse(localStorage.getItem("courseData"));
            if (!savedData) {
                console.error("No course data found");
                return;
            }
            setcourseID(savedData.id);
      try {
         const id=savedData.id;
         const response=await courseContent(id);
         if(response){
            isLoading(true);
         }

         if(response.ok){
          const videos = await response.json();
          setCourseData(videos.data);
          setLatest(videos.data.courseVideos || []);
          setTest(videos.data.courseQuiz);
          if(videos.data.courseVideos?.length > 0){
            setCurrent(videos.data.courseVideos[0]);
            setVideoKey(1);
          }
          setEnrolement(true);
         }else {  
            console.error('Error response:', response.statusText);
          }
        } catch (err) {
          console.error('Error fetching course content:', err);
         
        }
     };
     fetchCourseContent();
  },[])
  
  if(!isLoggedIn){
   return (
      <LoginFirst/>
   )
  }

  async function hindleStartTest(item,courseid){
   try {
      
      const id=item._id;
      const resp = await getScore({"courseId":courseid,
                         "testId":id});
      if(resp.ok){
         const data=await resp.json();
         navigate('/start-quiz',{
            state:{
               item:item,
               scoreItem:data.data,
               valid:true
            }
         })
      }
      else{
         navigate("/start-quiz",{
            state:{
               item:item,
               courseId:courseid
            }
         })
      }
      
   
    } catch (error) {
      console.log(error);
    }
  }

  if(!loading){
   return(
      <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
     </div>
     </div>
   )
  }
  return (
      enrole?(
         <>
      <div className="cont">
      <div className="name"><h1>{courseData.courseName}</h1></div>
      <div className='show-tut'>
    {
        currentVideo != null ? (
            <div className="video-tut">
                <video
                    id="media-player_html5_api"
                    className="tech"
                    poster={currentVideo.coverImage}
                    controls
                    key={videoKey}
                >
                    <source type='video/mp4' src={currentVideo.videolink} />
                </video>
                <h1>{currentVideo.description}</h1>
            </div>
        ) : (
            <p>Loading video...</p>
        )
    }
    <div className='data-content'>
        <h1>Course Materials: Watch & Learn</h1>
        <div className="content">
            {
                latestvideo.length > 0 ? (
                    latestvideo.map((item, index) => (
                        <div className="change" key={index}>
                            <button className='button-style-content' onClick={e => changeVideo(item, index)}>
                                <img src={item.coverImage} alt="Image not supported" />
                                <h1>{index + 1}</h1>
                                <div className="button-content-description">
                                    <label htmlFor="description" className='course-description-content'>{item.description}</label>
                                </div>
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading videos...</p> // Display this when there are no videos
                )
            }
        </div>
        <div>
            <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" 
                href="#" 
                role="button" 
               data-bs-toggle="dropdown" 
               aria-expanded="false">
               <h6>Give test here</h6>
               <p>to select the quiz click below</p>
            </a>
            <ul className="dropdown-menu">
            {
                  test?.map((item,index)=>(
                     <div key={index}>
                        <li>
                      <button className="dropdown-item" onClick={
                        ()=>hindleStartTest(item,course_Id)
                      }>{item.quizName}</button>
                       </li>
                     </div>
                  ))
               }
           </ul>
               </div>
         <div>
                  
               </div>
               
            </div>
         </div>
       </div>
      <div className="give-test">
       <Outlet/>
     </div>
      </div>
       </>
       
      ):
      <Enrolement/>
   )
    
}

export default StartTutorial
