import axios from "axios";
// import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { SERVER as server } from "../config";
import { setUser } from "../redux/action/user";
const userApi = {
  create: `${server}/user/signup`,
  login: `${server}/user/login`,
  update: `${server}/user/update`,
};

const Auth = ({ type }) => {
  const search = useLocation().search;
  const callbackurl = new URLSearchParams(search).get("callbackurl");
  const navigate = useNavigate();
  const { User } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (cookies && cookies.hasOwnProperty("token")) {
      dispatch(setUser(cookies.token));
    }
  }, [cookies, dispatch]);

  const loginHandler = () => {
    async function login() {
      try {
        const { data } = await axios.post(userApi.login, {
          email,
          password,
        });
        setCookies("token", data, { path: "/" });
        dispatch(setUser(data));
      } catch (err) {
        console.log(err.response.data);
      }
    }
    login();
  };
  const signUpHandler = () => {
    async function create() {
      try {
        const name = { fname, lname };
        await axios.post(userApi.create, {
          name,
          email,
          phone,
          password,
        });
        loginHandler();
      } catch (err) {
        console.log(err.message);
      }
    }
    create();
  };

  const selecHadler = type === "login" ? loginHandler : signUpHandler;

  if (User) {
    if (callbackurl) {
      console.log("B replace", callbackurl);
      const _callbackurl = callbackurl.replace(window.location.origin, "");
      console.log(window.location.origin);
      console.log("A replace", callbackurl);
      setTimeout(() => navigate(_callbackurl), 500);
      return null;
    } else {
      setTimeout(() => navigate("/"), 500);
      return null;
    }
  }

  return (
    <div>
      <div className="w-screen flex justify-center h-screen items-center">
        <div className="pt-5">
          <h1 className="text-center font-semibold text-2xl mb-5">
            {type === "login" ? "Sign In" : "Sign Up"}
          </h1>
          <div className="flex flex-col gap-2">
            {type === "signup" && (
              <div className="flex gap-2">
                <Input
                  label={"fname"}
                  id={"fname"}
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
                <Input
                  label={"lname"}
                  id={"lname"}
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                />
              </div>
            )}
            <Input
              label={"email"}
              id={"email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {type === "signup" && (
              <Input
                label={"phone"}
                id={"phone"}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            )}
            <Input
              label={"password"}
              id={"password"}
              value={password}
              type={"password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="h-12 w-28 rounded-md flex items-center justify-center bg-orange-600 text-white"
              onClick={selecHadler}
            >
              {type === "login" ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="flex justify-center">
            <p className="text-neutral-500 mt-12">
              {type === "login"
                ? "Don't have an account"
                : "Already have an account?"}
              <span className="text-black ml-1 hover:underline cursor-pointer">
                <Link to={`/${type === "login" ? "signup" : "login"}`}>
                  {type === "login" ? "Create an account" : "Login"}
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
