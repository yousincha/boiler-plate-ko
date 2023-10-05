import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { loginUser } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body));

    axios
      .post("/api/users/login", body)
      .then((response) => {
        if (response.data.loginSuccess) {
          navigate("/"); // 루트 페이지로 이동
        } else {
          alert("Error");
        }
      })
      .catch((error) => {
        // 에러 핸들링
        console.error("Login Error: ", error);
        alert("로그인 중에 오류가 발생했습니다.");
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
