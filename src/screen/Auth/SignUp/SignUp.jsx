import React, { useContext, useState } from "react";
import Button from "../../../components/Button/Button";
import { Input } from "baseui/input";
import Card from "../../../components/UI/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { sendUserData } from "../../../service/AuthService";
import authContext from "../../../context/AuthContext";
import Swal from 'sweetalert2';
import "./Signup.css";
import { setItem } from "../../../helper/Storage";

const SignUp = () => {
  const { onLogin } = useContext(authContext);
    const navigator = useNavigate();
    const [userName, setUserName ] = useState()
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [loading, setLoading] =useState(false);
    const [error ,setError] = useState();

    const userEmailHandler = (e) => {
      setUserEmail(e.target.value);
      setError();
    }
    const userPasswordHandler = (e) => {
      setLoading(false);
      setUserPassword(e.target.value);
      setError();
    }

    const userNameHandler = (e) => {
      setLoading(false);
      setUserName(e.target.value)
      setError()
    }
   const handlerSubmit = async (e) => {
    setLoading(true);
    e.preventDefault()
    if(userPassword.trim().length <6) {
      setError("Password at lease six characters");
      setLoading(false);
      return
    }
    const userData = {
      displayName: userName,
      email : userEmail,
      password :userPassword,
      returnSecureToken : true
    }
    const response = await sendUserData(userData);
    if(response?.data?.idToken) {
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: 'Your sign up is successfull',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        onLogin(true);
        setItem("user", {userToken : response?.data?.idToken , email :response?.data?.email,userName : response?.data.displayName,userId  :response?.data.localId})
        navigator('/');
     
      });
    }
    else {
        setError(response?.response?.data?.error.message)
    }
   }
  return (
    <Card>
    <form onSubmit={(e) => handlerSubmit(e)}>
 
        <label className="form-label">User Name</label>
        <Input
         type = "text"   
         value = {userName || ""}
         name = "userName"
         onChange = {userNameHandler}
         placeholder="Enter your name"
         overrides={{
          Input: {
            style: ({ $theme }) => ({
              height:"40px",
            })
          }
        }}
         required
       />
        <label className="form-label">Email</label>
        <Input
         type = "email" 
         name="userEmail"  
         value = {userEmail || ""}
         onChange = {userEmailHandler}
         placeholder="name@example.com"
         overrides={{
          Input: {
            style: ({ $theme }) => ({
              height:"40px",
            })
          }
        }}
         required
       />
      <label className="form-label">password</label>
      <Input
         type = "password"
         value = {userPassword || ""}
         onChange =  {userPasswordHandler}
         name = "userPassword"
         placeholder="Password"
         overrides={{
          Input: {
            style: ({ $theme }) => ({
              height:"40px",
            })
          }
        }}
         required
       />
       {error && <p style={{color:"red"}} >{error}</p>}
      <div className="mb-3 button-sign-up">
        <Button type ="submit" classes = "form-control" disable = {!userEmail  || !userName  || !userPassword? true : false}>{loading ? <div className="spinner-border text-success" role="status"></div> : "Sign up"}</Button>
      </div>
      <div style ={{textAlign : "center"}}>
      <NavLink to = "/auth">Already user</NavLink>
      </div>
    
    </form>
    </Card>

  );
};

export default SignUp;