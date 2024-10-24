import React from "react";
import { UserContext } from "./userContext.js";

const UserContextProvider=({children})=>{
   const [isLoggedIn, setIsLoggedIn]=React.useState(false);
   return(
      <UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
        {children}
      </UserContext.Provider>
   )
}

export { UserContextProvider};