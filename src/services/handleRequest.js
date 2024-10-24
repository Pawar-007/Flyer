const LoginUser=async (email, username, password)=>{
   try {
      const response = await fetch('http://localhost:8000/api/v1/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
        credentials: 'include',
      })
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred during login. Please try again later.');
    }
  
}

const logoutuser=async (token)=>{
  try {
    const logout=await fetch("http://localhost:8000/api/v1/logout",{
      method:"POST",
      credentials:"include",
      headers: {
      "Content-Type": "application/json",
      "Authorization":`Bearer : ${token}`
       
      },
     
    })
    
    return logout;
  } catch (error) {
    console.error(error);
  }
}

const registerInstructor=async (contact,qualifications)=>{
try {
  const token=localStorage.getItem("Token");
  const register=await fetch("http://localhost:8000/api2/v2/inst/instructorRegistration",{
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      "Authorization":`Bearer : ${token}`
    },
    credentials:"include",
    body:JSON.stringify({
      "contact":contact,
      "qualifications":qualifications
    })
  })

  if(!register.ok){
    throw new Error(`Invalid credintials`);
  }
  return register;
} catch (error) {
  console.error(error);
  throw error;
}
}
export {
   LoginUser,logoutuser,registerInstructor
}