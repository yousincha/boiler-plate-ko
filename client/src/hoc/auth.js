import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function Auth({ SpecificComponent, option, adminRoute = null }) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await dispatch(auth());
          console.log(response);

          if (!response.payload.isAuth && option) {
            navigate("/login");
          } else if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else if (option === false) {
            navigate("/");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [dispatch, navigate]); // option과 adminRoute를 의존성 배열에서 제거

    return <SpecificComponent {...props} />;
  }

  return <AuthenticationCheck />;
}

export default Auth;
