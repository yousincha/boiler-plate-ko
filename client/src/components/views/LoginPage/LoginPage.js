import axios from "axios"; // Axios를 올바르게 임포트합니다.
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { loginUser } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수를 얻음
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

    axios.post("/api/users/login", body).then((response) => {
      // Axios.post()를 올바르게 호출합니다.
      // 처리할 내용 작성
      if (response.data.loginSuccess) {
        navigate("/"); // navigate 함수를 사용하여 페이지 이동
      } else {
        alert("Error");
      }
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
