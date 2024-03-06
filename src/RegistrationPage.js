
import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function RegistrationPage() {
  
  const [formData, setFormData] = useState({
    full_name: '', 
    contact_number: '', 
    email: '', 
    date_of_birth: '',
    password: '',
    confirm_password: ''
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  function validate() {
    
    const CANADA_PHONE_NUMBER_REGEX = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

    let temp = {};
    temp.full_name = formData.full_name ? "" : "This field is required.";
    temp.contact_number = CANADA_PHONE_NUMBER_REGEX.test(formData.contact_number) ? "" : "Invalid phone number format.";
    temp.email = /\S+@\S+\.\S+/.test(formData.email) ? "": "Email is not valid.";
    temp.date_of_birth = DATE_REGEX.test(formData.date_of_birth) ? "": "Date of birth is not valid";    
    temp.password = formData.password.length >= 8 
                  && /[a-z]/.test(formData.password) 
                  && /[A-Z]/.test(formData.password) 
                  && /[0-9]/.test(formData.password) ? "" : "Must have 8 characters in length, a lowercase and an uppercase letter, a number."

    temp.confirm_password = formData.password === formData.confirm_password ? "" : "Passwords must match."
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "");
  }

  function handleSubmit(e) {

    console.log("validate entered.", e);
    e.preventDefault();    

    if(validate()){
      const result = axios.post('https://fullstack-test-navy.vercel.app/api/users/create', formData)
                          .then(result => {
                            if(result.data.title === 'Success'){
                            
                              console.log(result.data)
                              alert('User Created Successfully');
                            } else {
                            
                              console.log(result.data)
                              alert(result.data.description);
                            }
                          })
                          .catch(error => {
                            console.error("Error: ", error);
                          });

    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setFormData({
      full_name: '', 
      contact_number: '', 
      email: '', 
      date_of_birth: '',
      password: '',
      confirm_password: ''
    });
  }

  return (
  <div className='form__container flex justify-center items-center h-screen' style={{ width: '355px', height: '339px'}}>
    <form className='registration-form bg-white shadow-md rounded-lg p-8' onSubmit={handleSubmit} >
      <div>
        <div className="form-field">
          <label>Full Name</label>
          <input type="text" name="full_name" value={formData.full_name} onChange ={handleChange} required/>
          <div className="error">{errors.full_name}</div>
        </div>
        <div className="form-field">
        <label>Contact Number</label>
          <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required/>
          <div className="error">{errors.contact_number}</div>
        </div>
        <div className="form-field">
        <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
          <div className="error">{errors.email}</div>
        </div>
        <div className="form-field">
          <label>Date of Birth</label>
          <input type="text" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} placeholder="YYYY-MM-DD" required/>
          <div className="error">{errors.date_of_birth}</div>
        </div>
        <div className="form-field">
          <label>Create a Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
          <div className="error">{errors.password}</div>
        </div>
        <div className="form-field">
        <label>Confirm Password</label>
          <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required/>
          <div className="error">{errors.confirm_password}</div>
        </div>
        
        <div className="form-field-button">
          <button type="button" 
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md shadow-md"
          onClick={handleCancel}>Cancel</button>
          
          <button type="submit" 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
            Submit
          </button>
        </div>
      </div>  
    </form>
  </div>);
}

export default RegistrationPage;