import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials]=useState({email: "",password:""});
  const history = useNavigate()
  const onChange = (e) => {
    // here we are using spread property 
    //  In this whatever property is present will be there and the overeride or add the new one
    setCredentials({...credentials,[e.target.name]: e.target.value})
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmNjRmNjQ0ZGIwMGQxYjg5ZGJkZWRmIn0sImlhdCI6MTY0MzU0Mjc0Nn0.Hog2GMEpJqjagG1oludHrh2WHl6b2UuyzTDY9kGL0Gg",
      },
      body: JSON.stringify({ email:credentials.email , password : credentials.password})
    });
    const json = await response.json();
    if(json.success){
      // save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      // to redirect we use useNavigate hook
      history("/");
    }
    else{
      alert("invalid credentils");
    }
    console.log(json); 
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
