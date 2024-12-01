import React, { useState } from 'react'
import "../../style/signup.css"
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../Home/spinner.jsx';
import imageProfile from '../../../public/smile-icon.png'
const x=import.meta.env.VITE_SENDREQUEST
export default function Signup() {
   const [username,setUserName]=useState('');
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [confirmPassword,setConfirmPassword]=useState('');
   const [error, setError] = useState('');
   const [profile_Photo, set_ProfilePhoto] = useState('');
   const [file,setFile]=useState('');
   const [wait,setWait]=useState(false);
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
    setWait(true);
    try {
      if (password == confirmPassword) {
        const form = new FormData();
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        let imageToUpload = profilePhoto;
        if (!imageToUpload) {
          // Use the smile icon as a fallback if no photo is uploaded
          const response = await fetch(imageProfile);  // Get the image from the public folder
          const imageBlob = await response.blob(); // Convert the image into a Blob object
    
          // Create a File object from the Blob with a name and type
          imageToUpload = new File([imageBlob], "smile-icon.png", { type: 'image/png' });
        }
        form.append("image", imageToUpload);
        const register=await fetch(`${x}/api/v1/studentRegistration`,
        {
          method:"POST",
          credentials:"include",
          body:form
        })
        
        if (!register.ok) {
          // Handle error response from the server
          const errorResponse = await register.json();
          console.error("Registration failed:", errorResponse);
          alert(errorResponse.message || "Registration failed, please try again.");
          return;
        }

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
    }finally{
      setWait(false);
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

  if(wait){
    return <Spinner/>;
  }
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


