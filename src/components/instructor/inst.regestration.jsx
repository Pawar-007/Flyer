import React, { useState } from 'react';
import './regestration.css'; // Import the CSS file for styling
import { registerInstructor } from '../../services/handleRequest.js';
const FormPage = () => {
  const [contact, setContact] = useState('');
  const [qualifications, setQualifications] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const regis=registerInstructor(contact,qualifications);
    regis.then(item=>{
      if (regis.ok) {
         alert("Welcome as a teacher!");
         console.log("Registration successful");
       } else {
         console.log("Registration failed: ", regis.statusText);
       }
    })
    .catch(error=>{
      console.log(error);
    })
  };

  return (
    <div className="form-container">
      <h2>Submit Your Contact Information and Qualifications</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your contact information"
          />
        </div>
        <div className="form-group">
          <label htmlFor="qualifications">Qualifications</label>
          <textarea
            id="qualifications"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            placeholder="Enter your qualifications"
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
