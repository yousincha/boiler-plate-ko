import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate를 사용합니다.

function LandingPage() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 라우팅을 처리합니다.

  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response);
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login"); // navigate를 사용하여 로그아웃 후 로그인 페이지로 이동합니다.
      } else {
        alert("로그아웃 하는데 실패 했습니다.");
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
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default LandingPage;
