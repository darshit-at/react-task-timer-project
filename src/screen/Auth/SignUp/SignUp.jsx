import React, { useContext, useState, useEffect } from "react";
import Button from "../../../components/Button/Button";
import { Input } from "baseui/input";
import Card from "../../../components/UI/Card";
import { NavLink, useNavigate } from "react-router-dom";
import { sendUserData } from "../../../service/AuthService";
import authContext from "../../../context/AuthContext";
import Swal from "sweetalert2";
import "./Signup.css";
import { setItem } from "../../../helper/Storage";
import "../auth.css";
import { checkBlankUserInput } from "../../../helper/Validation";
import { getItem } from "../../../helper/Storage";
const SignUp = () => {
  const { onLogin ,isAuth } = useContext(authContext);
  const user = getItem("user");
  const navigator = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValidate, setEmailValidate] = useState("");
  const [passWordValidate, setPassWordValidate] = useState("");
  const [userNameValidate, setUserNameValidate] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    if (isAuth || user?.userToken) {
       navigator("/");
    };
  }, []);

  const userEmailHandler = (e) => {
    setUserEmail(e.target.value);
    setEmailValidate("");
  };
  const userPasswordHandler = (e) => {
    setLoading(false);
    setUserPassword(e.target.value);
    setPassWordValidate("");
  };

  const checkInputPasswordHandler = () => {
    if (userPassword.trim().length > 8) {
      setPassWordValidate("Please enter maximum 8 digit");
    }
  };
  const userNameHandler = (e) => {
    setLoading(false);
    setUserName(e.target.value);
    setUserNameValidate("");
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const isEmailVaild = checkBlankUserInput(userEmail);
    const isPassWordVaild = checkBlankUserInput(userPassword);
    const isUserNameBlank = checkBlankUserInput(userName);

    if (isEmailVaild) {
      setEmailValidate("Please enter email ");
    }
    if (isPassWordVaild) {
      setPassWordValidate("Please enter password");
    }
    if (isUserNameBlank) {
      setUserNameValidate("please enter user name");
    }
    if (userPassword.trim().length < 6 && userPassword.trim().length > 0) {
      setPassWordValidate("Please enter minimum 6 digit");
      setLoading(false);
      return;
    }
    if (userEmail !== "" && userName !== "" && userPassword.trim().length < 9) {
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
      }
    }
  };

  return (
    <div className="auth-contain">
      <div className="logo">
        <img
          src="https://management.agreemtechnologies.com/upload/large.png"
          alt=""
        />
      </div>
      <Card>
        <form onSubmit={(e) => handlerSubmit(e)}>
          <label className="form-label">User Name</label>
          <Input
            type="text"
            value={userName || ""}
            name="userName"
            onChange={userNameHandler}
            placeholder="Username"
            overrides={{
              Input: {
                style: ({ $theme }) => ({
                  height: "40px",
                }),
              },
            }}
          />
          <p style={{ color: "red" }}>{userNameValidate}</p>
          <label className="form-label">Email</label>
          <Input
            type="email"
            name="userEmail"
            max={8}
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
          <p style={{ color: "red" }}>{emailValidate}</p>
          <label className="form-label">password</label>
          <Input
            type="password"
            value={userPassword || ""}
            onChange={userPasswordHandler}
            name="userPassword"
            onBlur={() => checkInputPasswordHandler()}
            placeholder="Password"
            overrides={{
              Input: {
                style: ({ $theme }) => ({
                  height: "40px",
                }),
              },
            }}
          />
          <p style={{ color: "red" }}>{error ? error : passWordValidate}</p>
          <div className="mb-3 button-sign-up">
            <Button type="submit" classes="form-control authButton">
              {loading ? (
                <div
                  className="spinner-border text-success"
                  role="status"
                ></div>
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
    </div>
  );
};

export default SignUp;
