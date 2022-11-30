import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { Input } from "baseui/input";
import Card from "../../../components/UI/Card";
import { useState } from "react";
import { fetchUserData } from "../../../service/AuthService";
import Swal from "sweetalert2";
import { setItem } from "../../../helper/Storage";
import authContext from "../../../context/AuthContext";

const Login = () => {
  const { onLogin } = useContext(authContext);
  const navigator = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error ,setError] = useState()
    
    const userEmailHandler = (value) => {
      setUserEmail(value);
      setError()
    }
    const userPasswordHandler = (value) => {
      setUserPassword(value);
      setError()
    }

    const handlerSubmit = async (e) => {
      e.preventDefault()
      const userData = {
        email : userEmail,
        password :userPassword,
        returnSecureToken : true
      }
      const response = await fetchUserData(userData);
      console.log(response)
      if(response?.data?.idToken) {
        Swal.fire({
          position: 'center-center',
          icon: 'success',
          title: `Welcome back ${response?.data.displayName}`,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          onLogin(true)
          setItem("user", {userToken : response?.data?.idToken , email :response?.data?.email,userName : response?.data.displayName,userId  :response?.data.localId})
          navigator('/');
        })
      }
      else {
          setError(response?.response?.data?.error.message);
      }
     }
     
  return (
    <Card>
    <form onSubmit={(e) => handlerSubmit(e) }>
      <div className="mb-3">
      <label className="form-label">Email</label>
        <Input
         type = "email"
         onChange = {(e) => userEmailHandler(e.target.value)}
         placeholder="name@example.com"
         value={userEmail}
         name = "userName"
       />
      </div>
      <div className="mb-3">
      <label className="form-label">password</label>
      <Input
         type = "password"
         name="userPassword"
         value={userPassword}
         onChange = {(e) => userPasswordHandler(e.target.value)}
         placeholder="Password"
       />
       {error && <p style ={{color : "red"}}>{error}</p>}
      </div>
      <div className="mt-3">
        <Button type ="submit" classes = "form-control authButton">Login</Button>
      </div>
      <div style={{textAlign : 'center'}}>
      <NavLink to = "/auth/signup">Register Here</NavLink>
      </div>
   
    </form>
    </Card>

  );
};

export default Login;