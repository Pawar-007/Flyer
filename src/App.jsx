import './App.css'
import React from 'react';
import Routers from './router/router.jsx';
import { UserContextProvider } from './contex/userContexProvider.jsx';
import { RouterProvider } from 'react-router-dom';
import { NewCourseProvider } from './contex/newCourseContext.jsx';
import { AuthProvider } from './components/access/authProvider.jsx';
import { CourseProvider } from './contex/courseContex.jsx';


function App() {
  
  return (
      <>
      <UserContextProvider>
        <CourseProvider>
        <NewCourseProvider>
        <AuthProvider>
        <RouterProvider router={Routers} />
        </AuthProvider>
        </NewCourseProvider>
        </CourseProvider>
      </UserContextProvider>
      </>
  )
}

export default App;
