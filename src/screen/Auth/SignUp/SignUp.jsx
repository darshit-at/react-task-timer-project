import React, { useContext, useState } from "react";
import Button from "../../../components/Button/Button";
import { Input } from "baseui/input";
import Card from "../../../components/UI/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { sendUserData } from "../../../service/AuthService";
import authContext from "../../../context/AuthContext";
import Swal from "sweetalert2";
import "./Signup.css";
import { setItem } from "../../../helper/Storage";
import { checkBlankUserInput } from "../../../helper/Validation";
const SignUp = () => {
  const { onLogin } = useContext(authContext);
  const navigator = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValidate, setEmailValidate] = useState("");
  const [passWordValidate, setPassWordValidate] = useState("");
  const [userNameValidate, setUserNameValidate] = useState("");
  const [error, setError] = useState();

  const userEmailHandler = (e) => {
    setUserEmail(e.target.value);
    setError();
    setEmailValidate('')
  };
  const userPasswordHandler = (e) => {
    setLoading(false);
    setUserPassword(e.target.value);
    setError();
    setPassWordValidate("")
  };

  const userNameHandler = (e) => {
    setLoading(false);
    setUserName(e.target.value);
    setError();
    setUserNameValidate("");
  };
  const handlerSubmit = async (e) => {

    e.preventDefault();
    const isEmailVaild    = checkBlankUserInput(userEmail);
    const isPassWordVaild = checkBlankUserInput(userPassword);
    const isUserNameBlank = checkBlankUserInput(userName);
    
    if(isEmailVaild) {
      setEmailValidate("Please enter email ");
    }
    if(isPassWordVaild){
      setPassWordValidate("Please enter password");
    }
    if(isUserNameBlank){
      setUserNameValidate("please enter your name");
    }
    if (userPassword.trim().length < 6) {
      setError("Password at least six characters");
      setLoading(false);
      return;
    }
    if(userEmail!== '' && userName!== '' && userPassword!=='') {
      setLoading(true);
      const userData = {
        displayName: userName,
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      };
      const response = await sendUserData(userData);
      if (response?.data?.idToken) {
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Your sign up is successfull",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onLogin(true);
          setItem("user", {
            userToken: response?.data?.idToken,
            email: response?.data?.email,
            userName: response?.data.displayName,
            userId: response?.data.localId,
          });
          navigator("/");
        });
      } else {
        const errorMessage = response?.response?.data?.error.message.charAt(0).toUpperCase() + response?.response?.data?.error.message.slice(1).toLowerCase();
        setError(() => errorMessage.replace("_", " "));
      }
    }

  };

  return (
    <Card>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <label className="form-label">User Name</label>
        <Input
          type="text"
          value={userName || ""}
          name="userName"
          onChange={userNameHandler}
          placeholder="Enter your name"
          overrides={{
            Input: {
              style: ({ $theme }) => ({
                height: "40px",
              }),
            },
          }}
          
        />
          <p style={{ color: "red" }}>
          {userNameValidate}
        </p>
        <label className="form-label">Email</label>
        <Input
          type="email"
          name="userEmail"
          value={userEmail || ""}
          onChange={userEmailHandler}
          placeholder="name@example.com"
          overrides={{
            Input: {
              style: ({ $theme }) => ({
                height: "40px",
              }),
            },
          }}
        />
         <p style={{ color: "red" }}>
          {emailValidate}
        </p>
        <label className="form-label">password</label>
        <Input
          type="password"
          value={userPassword || ""}
          onChange={userPasswordHandler}
          name="userPassword"
          placeholder="Password"
          overrides={{
            Input: {
              style: ({ $theme }) => ({
                height: "40px",
              }),
            },
          }}
        />
        <p style={{ color: "red" }}>
          {userPassword!== "" ? error : passWordValidate}
        </p>
        <div className="mb-3 button-sign-up">
          <Button
            type="submit"
            classes="form-control authButton"
          >
            {loading ? (
              <div className="spinner-border text-success" role="status"></div>
            ) : (
              "Sign up"
            )}
          </Button>
        </div>
        <div style={{ textAlign: "center" }}>
          <NavLink to="/auth">Already user</NavLink>
        </div>
      </form>
    </Card>
  );
};

export default SignUp;
