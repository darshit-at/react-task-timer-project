import React, { Fragment, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { Input } from "baseui/input";
import Card from "../../../components/UI/Card";
import { useState } from "react";
import { fetchUserData } from "../../../service/AuthService";
import Swal from "sweetalert2";
import { setItem } from "../../../helper/Storage";
import authContext from "../../../context/AuthContext";
import { checkBlankUserInput } from "../../../helper/Validation";
import '../auth.css';

const Login = () => {
  const { onLogin } = useContext(authContext);
  const navigator = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [passWordValidate, setPassWordValidate] = useState("");
  const [error, setError] = useState();

  const userEmailHandler = (value) => {
    setUserEmail(value);
    setEmailValidate("");
  };
  const userPasswordHandler = (value) => {
    setUserPassword(value);
    setPassWordValidate("");
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const isEmailVaild = checkBlankUserInput(userEmail);
    const isPassWordVaild = checkBlankUserInput(userPassword);
    if (isEmailVaild) {
      setEmailValidate("Please enter email ");
    }
    if (isPassWordVaild) {
      setPassWordValidate("Please enter password");
    }
    if (userEmail !== "" && userPassword !== "") {
      const userData = {
        email: userEmail,
        password: userPassword,
        returnSecureToken: true,
      };
      const response = await fetchUserData(userData);
      if (response?.data?.idToken) {
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: `Welcome back ${response?.data.displayName}`,
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
        const errorMessage =
          response?.response?.data?.error.message.charAt(0).toUpperCase() +
          response?.response?.data?.error.message.slice(1).toLowerCase();
        setError(() => errorMessage.replace("_", " "));
      }
    }
  };

  return (
    <div className="auth-contain">
      <div className="logo">
        <img src="https://management.agreemtechnologies.com/upload/large.png" alt="" />
      </div>
      <Card>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <Input
              type="email"
              onChange={(e) => userEmailHandler(e.target.value)}
              placeholder="name@example.com"
              value={userEmail}
              name="userName"
            />
            <span style={{ color: "red" }}>{emailValidate}</span>
          </div>
          <div className="mb-3">
            <label className="form-label">password</label>
            <Input
              type="password"
              name="userPassword"
              value={userPassword}
              max={8}
              onChange={(e) => userPasswordHandler(e.target.value)}
              placeholder="Password"
            />

            <span style={{ color: "red" }}>
              {error ? error : passWordValidate}
            </span>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <div className="mt-3">
            <Button type="submit" classes="form-control authButton">
              Login
            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            <NavLink to="/auth/signup">Register Here</NavLink>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
