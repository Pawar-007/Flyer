import React from "react";

const ContextCourse=React.createContext();

export {ContextCourse};

export const NewCourseProvider=({children})=>{
   const [newCourseAdd,setNewCourseAdd]=React.useState(true);
   return <ContextCourse.Provider value={[newCourseAdd,setNewCourseAdd]}>
      {children}
   </ContextCourse.Provider>
}

