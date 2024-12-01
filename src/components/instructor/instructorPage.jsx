import React, { useEffect, useState } from 'react';
import { ThoughtCorse, deleteCourse } from '../../services/couces.services.js'; // Adjust the import path accordingly
import FormPage from './inst.regestration.jsx';
import "./instructor.css";
import { Link, Outlet } from 'react-router-dom';
import "./instructorPage.css";
import { useNavigate } from 'react-router-dom';
import Footer from './../footer/Footer.jsx';
import LoginFirst from '../Home/loginFirst.jsx';
import { ContextCourse } from '../../contex/newCourseContext.jsx';
import { courseContext } from '../../contex/courseContex.jsx';
import { Spinner } from '../Home/spinner.jsx';

const Newcourse = () => {
  const [newCourseAdd, setNewCourseAdd] = React.useContext(ContextCourse);

  return (
    <div className="newcourse-card">
      <h5 className="card-title">Start Your Teaching Journey</h5>
      <Link 
        to="newcourse" 
        className="btn btn-primary" 
        onClick={() => setNewCourseAdd(!newCourseAdd)}
      >
        Create a New Course
      </Link>
    </div>
  );
};

function InstructorPage() {
  const [courses, setCourses] = useState([]);
  const [auth, setAuth] = useState(null);
  const [Token, setToken] = useState(null);
  const useNavigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [newCourseAdd, setNewCourseAdd] = React.useContext(ContextCourse);
  const [, setCourseData] = React.useContext(courseContext);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('Token');
        setToken(token);
        
        if (!token) {
          throw new Error('No token found');
        }

        const response = await ThoughtCorse(token);
        const item = await response.json();   
        
        if (response.ok) {
          setAuth(true);
          setCourses(item.data);
        }
        else{
          setAuth(false);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      }finally {
        setIsLoading(false); // Hide spinner
      }
    };

    fetchCourses();
  }, []);
  if(isLoading){
    return <Spinner/>;
}
  function handleUpdate(course, index) {
    const coursedata = course[index];
    setCourseData(coursedata);
    useNavigation("/add-data", {
      state: {
        course: coursedata
      }
    });
  }

  async function handleCourseDeletion(course) {
    try {
      const deleted = await deleteCourse(course);
      if (deleted.ok) {
        console.log("Deleted successfully");
      }
      console.log("delete", deleted);
      const deletedData = await deleted.json();
      console.log("deleted data", deletedData);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }

  return (
    Token != null ? (
      auth ? (
        <div className='inst-cont'>
          <div
            className="ud-text-sm desktop-header-module--header--a5wri desktop-instructor-header-module--header--JdaD8"
            data-purpose="header"
          >
            <div style={{ flex: '1 1 0%' }}></div>
            <div className="popper-module--popper--mM5Ie desktop-header-module--gap-button--4drhI">
              <a
                href="/"
                data-testid="instructor-dropdown"
                id="popper-trigger--11"
                aria-describedby="popper-content--12"
                tabIndex="0"
                className="ud-btn ud-btn-large ud-btn-ghost ud-heading-md js-header-button desktop-header-module--dropdown-button--ipas9"
              >
                <span className="ud-text-sm desktop-header-module--dropdown-button-text--Sq73l">Student</span>
              </a>
            </div>
          </div>

          <div className="container">
            <h1>Courses You Have Created</h1>
            {courses?.length > 0 ? (
              courses.map((course, index) => (
                <div className="courseList" key={course._id || index}>
                  <div className="coverimage">
                    <img src={course?.coverImage} alt="course image" />
                  </div>
                  <div className="details-od-co">
                    <div className="coursename">{course.courseName}</div>
                    <div className="course-description">{course.description}</div>
                  </div>
                  <div className="go-to-edit-course">
                    <button type="button" onClick={e => handleUpdate(courses, index)}>Update Course</button>
                    <button onClick={e => handleCourseDeletion(course)}>Delete Course</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your courses</p>
            )}
          </div>
          
          {newCourseAdd ? <Outlet /> : null}
          <Newcourse />
          <div className="footerForInst">
          <Footer />
          </div>
          
        </div>
      ) : (
        <FormPage /> 
      )
    ) : (
      <LoginFirst />
    )
  );
}

export default InstructorPage;
