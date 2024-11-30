import React, { useState } from 'react'
import "../../style/signup.css"
import { useNavigate } from 'react-router-dom';
const x=import.meta.env.VITE_SENDREQUEST
export default function Signup() {
   const [username,setUserName]=useState('');
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [confirmPassword,setConfirmPassword]=useState('');
   const [error, setError] = useState('');
   const [profile_Photo, set_ProfilePhoto] = useState('');
   const [file,setFile]=useState('');
   
   const handleFileChange = (e) => {
    const file = e.target.files[0];
     
    if (file) {
       const reader = new FileReader();
       console.log("render",reader);
       setFile(file);
       reader.onloadend = () => {
          set_ProfilePhoto(reader.result); // Set the uploaded image as the img src
       };
       console.log("result",reader.result);
       reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
 };
async function handleSignup(username,email,password,confirmPassword,profilePhoto){
    try {
      if (password == confirmPassword) {
        const form = new FormData();
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        form.append('image', profilePhoto); 
        const register=await fetch(`${x}/api/v1/studentRegistration`,
        {
          method:"POST",
          credentials:"include",
          body:form
        })
        console.log("register",register)
        if(register.ok){
          alert("register successfull");
        }
        else{
          alert("registeer unsuccessfull ");
        }
      }
  
      else{
        console.error("password and confermPassword is not matching")
      }
    } catch (error) {
      console.error(error);
    }
}
const handleSubmit = (e) => {
  e.preventDefault();
  // Simple validation
  if (email === '' || username === '' || password === '') {
    setError('All fields are required');
    return;
  }
  handleSignup(email, username, password,confirmPassword,file);
  setError('');
  // Handle login logic here (e.g., API call)
  console.log('Logging in with:', { email, username, password });
};


  return (
    <div className='Register'>
       <div className="signup-container">
  <div className="signup-box">
    <form action="" id='form-page' onSubmit={handleSubmit}>
    <h2>Create an Account</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username"
         value={username} 
         placeholder="Enter your username"
         onChange={e=>setUserName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
        type="email"
        id="email" 
        placeholder="Enter your email"
        value={email}
        onChange={e=>setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        id="password" 
        placeholder="Enter your password"
        value={password}
        onChange={e=>setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input 
        type="password" 
        id="confirm-password" 
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={e=>setConfirmPassword(e.target.value)}/>
      </div>
      <button 
       className="signup-button"
       onClick={()=>{
        handleSignup(username,email,password,confirmPassword,file)
       }}
       >Sign Up</button>
    </form>
    <p className="error-message"> </p>
    <div className="profile-photo">
    <div className="photo-container">
        <div className="photo">
            <img src={profile_Photo} className="photo-preview" />
        </div>
        <label htmlFor="file-upload" className="upload-btn">
            Upload Profile
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} className="file-input-for-profile" />
    </div>
</div>
</div>
  
</div>
  
    </div>
  )
}


