import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";

function Auth({ SpecificComponent, option, adminRoute = null, history }) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        try { 
          const response = await dispatch(auth());
          console.log(response);

          if (!response.payload.isAuth && option) {
            history.push("/login");
          } else if (adminRoute && !response.payload.isAdmin) {
            history.push("/");
          } else if (option === false) {
            history.push("/");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }, [dispatch]);

    return <SpecificComponent {...props} />;
  }

  return <AuthenticationCheck />;
}

export default Auth;
