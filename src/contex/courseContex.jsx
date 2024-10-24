import React from "react";

export const courseContext=React.createContext()

export const CourseProvider=({children})=>{
     const [courseData, setCourseData]=React.useState('');
     
     return(
      <courseContext.Provider value={[courseData, setCourseData]}>
       {children}
      </courseContext.Provider>
     )
}