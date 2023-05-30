import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
const host = "http://localhost:8000";
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  let navigate = useNavigate();
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});    
 }
 const handleSubmit = async(e)=>{
  e.preventDefault();
  const {name,email,password} = credentials;

  const response = await fetch(`${host}/api/auth/createuser`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name,email,password}), // body data type must match "Content-Type" header
  });
  const json= await response.json(); // parses JSON response into native JavaScript objects
  console.log(json); 
    //Redirect
    if(json.success){
      localStorage.setItem('token',json.authToken);
      navigate("/");
      props.showAlert("Account Created Succesfully","success");

    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
}
  return (
    <div className= "mt-5 container col-md-6 col-md-offset-6">
      <h2>Create Account to start using iNotebook</h2>
      <form className="mt-5" onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={onChange}
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onChange}
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}

          />
        </div>

        <button type="submit" className="btn btn-warning">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
