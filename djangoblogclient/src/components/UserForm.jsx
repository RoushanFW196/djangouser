import React, { useEffect, useState } from "react";
import ".././userform.css"; // Assuming you have a separate CSS file
import { useNavigate } from "react-router-dom";

const UserForm = ({ data, handleupdateuser }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    mobile: "",
    profile_pic: null,
    password: "",
    id:null,
  });


  const navigate= useNavigate();
  useEffect(() => {
    if (data?.id) {
      setFormData((prevformdata) => ({ ...prevformdata, ...data }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  /*


    first way

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert form data to JSON
    const requestData = {
      ...formData,
      profile_pic: formData.profile_pic.name, // You need to handle file uploads separately
    };
  
    try {
      const response = await fetch('http://localhost:8000/user/create/', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('data', data);
  
      // Handle the response (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  */

  // if we are using images to upload, we need to use formdata, insteda pf json.stringify
  const handleSubmit = async (e) => {
    e.preventDefault();
    let method='POST'
    let _url='http://localhost:8000/user/create/'
    if (formData.profile_pic && formData.profile_pic.size > 10485760) {
      // 10 MB
      alert("File size exceeds 10MB. Please upload a smaller file.");
      return;
    }

    if(formData['id']){
      method='PUT'

      _url=`http://localhost:8000/user/update/${formData['id']}`
    }

    const formDataObj = new FormData();
    formDataObj.append("first_name", formData.first_name);
    formDataObj.append("last_name", formData.last_name);
    formDataObj.append("email", formData.email);
    formDataObj.append("age", formData.age);
    formDataObj.append("mobile", formData.mobile);
    formDataObj.append("profile_pic", formData.profile_pic); // File
    formDataObj.append("password", formData.password);
    formDataObj.append("id", formData.id);
    try {
      const response = await fetch(_url, {
        method: method,
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }else{
        handleupdateuser()
        navigate('/userlist')
      }

      const data = await response.json();
      console.log("data", data);

      // Handle the response (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error:", error);
    }
  };



   console.log('formdata', formData)

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          maxLength="50"
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          maxLength="50"
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          maxLength="50"
          required
        />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          maxLength="12"
          required
        />
      </div>
      <div className="form-group">
        <label>Profile Picture:</label>
        <input
          type="file"
          name="profile_pic"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          maxLength="128"
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default UserForm;
