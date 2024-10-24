import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from '../layout.jsx'; // Make sure this path is correct
import Home from '@components/Home/Home.jsx'; // Ensure this alias is configured
import Login from '../components/Home/Login.jsx';
import Signup from '../components/access/signup.jsx';
import InstructorPage from '../components/instructor/instructorPage.jsx';
import CreateQuiz from '../components/instructor/createquiz.jsx';
import NewCourse from '../components/instructor/newCourse.jsx';
import Updatecourse from '../components/instructor/updateCourse.jsx';
import StartTutorial from '../components/Home/startTutorial.jsx';
import StartTest from '../components/instructor/startTest.jsx';
import InstructorHome from '../components/instructor/instructorHome.jsx'
const Routers = createBrowserRouter([
   //   createRoutesFromElements(
   //    <Route path="/" element={<Layout/>}></Route>
   //   )
   {
      path: '/',
      element: <Layout/>,
      children:[ 
         {
            path:'',
            element:<Home/>
         },
         {
            path:"login",
            element:<Login/>
      
          },
          {
            path:"signup",
            element:<Signup/>
          },
          {
          path:"Start-course",
          element:<StartTutorial/>
         },
      ]
    },
    {
      path:"/instructor",
      element:<InstructorHome/>,
      children:[
        {
          path:"newcourse",
          element:<NewCourse/>
        },
      ]
    },
    {
      path:"/start-quiz",
      element:<StartTest/>
    },
    {
      path:"/add-data",
      element:<Updatecourse/>,
    },
    {
      path:"/addquiz",
      element:<CreateQuiz/>
    }
    
]);

export default Routers;
