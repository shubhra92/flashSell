import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/action/user";

const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const { User } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["token"]);
  const callbackUrl =
    window.location.pathname === "/login"
      ? ""
      : `?callbackurl=${window.location.href}`;

  if (!User) {
    navigate(`/login${callbackUrl}`);
  }

  useEffect(() => {
    if (cookies && cookies.hasOwnProperty("token")) {
      dispatch(setUser(cookies.token));
    } else {
      navigate(`/login${callbackUrl}`);
    }
  }, [cookies, dispatch, navigate, callbackUrl]);
  return <>{children}</>;
};

export default ProtectRoute;
