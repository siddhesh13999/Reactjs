import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
const host = "http://localhost:8000";

const Login = (props) => {
  const {showAlert} = props;
  const [credentials, setCredentials] = useState({email:"",password:""});
  let navigate = useNavigate();
  const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});    
 }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email:credentials.email,password:credentials.password}), // body data type must match "Content-Type" header

        });
        const json= await response.json(); // parses JSON response into native JavaScript objects
        console.log(json); 
        if(json.success){
          //Redirect
          localStorage.setItem('token',json.authToken);
          navigate("/");
          showAlert("Logged In Succesfully","success");
        }
        else{
          showAlert("Invalid Credentials","danger");
        }
    }
  return (
    <div className= "mt-5 container col-md-6 col-md-offset-6">
      <h2>Login to continue to iNotebook</h2>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className=" mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
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
            onChange={onChange}
            name="password"
            value={credentials.password}
          />
        </div>
        <button type="submit"  className="btn btn-warning">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
