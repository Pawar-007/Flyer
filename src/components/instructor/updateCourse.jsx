import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './updateCourse.css'; 
import { Link } from 'react-router-dom';
import { addVideoTuto,deleteVideoTut, updatePage,removeTest} from '../../services/couces.services';
import token from '../../token.js';
import { Outlet } from 'react-router-dom';
import { courseContext } from '../../contex/courseContex.jsx';
import CreateQuiz from './createquiz.jsx';
const Spinner = () => (
  <div className="d-flex align-items-center">
  <strong role="status">Loading...</strong>
  <div class="spinner-border ms-auto" aria-hidden="true"></div>
</div>   
);
export default function UpdateCourse() {
  const [courseData, setCourseData] = useContext(courseContext);
  const location = useLocation();
  const courseState=location.state?.course
  const [video, updateVideo] = useState([]);
  const [coverImages, setCoverImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [AddTest,setAddTest]=useState(false);
  useEffect(()=>{
     const dataFetch=async()=>{
      try {
        const updateData=await updatePage(courseState?._id);
        const item=updateData.data;
        setCourseData(item);
       } catch (error) {
        console.error(error)
       }
     }
     dataFetch();
  },[])
  const handleAddVideo = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; 
      updateVideo(prevData => [...prevData, file]);
      setCoverImages(prevImages => [...prevImages,'']);
      setDescriptions(prevDescs => [...prevDescs, '']); 
    } else {
      console.error('No files selected or e.target.files is undefined');
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value,files} = e.target;
    
    if (name === 'description') {
      setDescriptions(prevDescs => {
        const newDescs = [...prevDescs];
        newDescs[index] = value;
        return newDescs;
      });
    } else if (name === 'coverImage') {
      const file=files[0];
      console.log("file",file);
      setCoverImages(prevData=>{
        const newImage=[...prevData]
        newImage[index]=file;
        console.log("prevdata",newImage);
        return newImage
      })
    } else {
      setCourseData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    setIsLoading(true);
    try {
      const added = await addVideoTuto(token, courseData.courseId, video, coverImages, descriptions);
      if (!added.ok) {
        // Handle non-OK response
        console.error("Server Error:", added.statusText);
        return;
      }
      if(added.ok){
        updateVideo([]);
        setCoverImages([]);
        setDescriptions([]);
      }
      const data = await added.json(); // Parse the response as JSON if the status is OK
      console.log("Added response:", data.data);
    } catch (error) {
      console.error("Error while adding video:", error);
    }finally {
      setIsLoading(false); // Stop loading
    }
  };
  const handleTestDeletion=async(courseID,testId)=>{
    try {
      const response=await removeTest(courseID,testId);
      if(response.ok){
        const data=await response.json();
        console.log("deleted data",data)
      }
    } catch (error) {
      
    }
  }
  const handleDeletion=async (e,index)=>{
    try {
      const courseId=courseData.courseId;
      const url=e.target.value;
      const imgurl=e.target.dataset.image;
      console.log(courseId,url,imgurl);
      const delition=await deleteVideoTut(courseId,url,imgurl);
      console.log("Deletion result:", delition);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
  {isLoading && <Spinner/>}
  <div class="course-update-container">
    <h1>Update Your Course Details</h1>
</div>  
  <div className="update-course-container">
      <div className="course-header">
        <img src={courseData.coverImage} alt="Course Cover" className="course-cover-image" />
        <h1>{courseData.courseName}</h1>
      </div>

      <div className="course-details">
        <textarea
          name="description"
          value={courseData.description}
          onChange={handleInputChange}
          className="course-description"
          rows="5"
        />
      </div>

      <div className="videos-section">
        <h2>Course Videos</h2>

        <div className="videos-list">
          {courseData?.courseVideos?.length > 0 ? (
            <div className="videos-container">
              {courseData.courseVideos.map((item, index) => (
                <div key={index} className="video-card-horizontal">
                  <img 
                    src={item.coverImage || courseData.coverImage} 
                    alt={`Video ${index + 1}`} 
                    className="video-thumbnail-horizontal"
                  />
                  <div className="video-info-horizontal">
                    <h3 className="video-title">Video {index + 1}: {courseData.courseName || 'Untitled Video'}</h3>
                    <p className="video-description">
                      {item.description || "No description available for this video."}
                    </p>
                    <div className="watch-delete">
                    <a href={item.videolink} target="_blank" rel="noopener noreferrer" className="watch-video-button">
                      Watch Video
                    </a>
                    <button
                    name='delete'
                    className="watch-video-button"
                    value={item.videolink}
                    data-image={`${item.coverImage}`}
                    onClick={e=>handleDeletion(e,index)}
                    >delet video</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No videos added yet.</p>
          )}
        </div>
        <div>
          <h6>quiz section</h6>
        </div>
        <div className="quiz-section">
          { 
            courseData.courseQuiz?.length > 0 ? (
              courseData.courseQuiz.map((item,index)=>{
                return(
                  <div className="quiz-data" key={item._id}>
                  <div>
                    <h6>{item.quizName}</h6>
                  </div>
                  <div>
                  <h4>{item.course.name}</h4>
                    <p>{item.course.details}</p>
                  </div>
                  <div>
                    <div>
                      <button className="btn">See the test</button>
                    </div>
                  </div>
                  <div>
                      <button className="btn" onClick={()=>handleTestDeletion(courseData._id,item._id)}>delete</button>
                    </div>
                </div>
                )
              })
            ):(<p>No quizzes available.</p>)
            
          }
        </div>
        <div>
          <label htmlFor="">Latest Content Added</label>
        </div>
        <div className="selected-file">
          {
            video.map((item, index) => (
              <div className="video-card" key={index}>
                <div className="video-details">
                  <h4>{item.name}</h4>
                  <input
                    type="file"
                    placeholder="Cover Image URL"
                    onChange={(e) => handleInputChange(e, index)}
                    name="coverImage"
                    className="cover-image-input"
                    
                  />
                  <textarea
                    placeholder="Video Description"
                    value={descriptions[index]}
                    onChange={(e) => handleInputChange(e, index)}
                    name="description"
                    className="description-input"
                  />
                </div>
              </div>
            ))
          }
        </div>
       
        <div className="file-input-container">
          <input
            type="file"
            accept="video/*"
            onChange={handleAddVideo}
            className="file-input"
          />
         {
          AddTest?<CreateQuiz  setAddTest={setAddTest} id={courseData._id} />:null
         }
         <div className="button-container">
  <button
    onClick={() => setAddTest(!AddTest)}
    style={{
      background: "green",
      color: "black",
      padding: "10px 20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer"
    }}

  >
   {AddTest?"cancle test":"Add test"}
  </button>
</div>
        </div>
        <div>
            <Outlet/>
          </div>
      </div>
      <button onClick={handleUpdate} className="add-video-button">Confirm Change</button>
    </div>
    </>
  );
}
