import React, { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { BsCart4, BsSearch } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchQuery } from "../redux/action/searchStr";
import { setUser } from "../redux/action/user";

const Header = () => {
  const [searchStr, setSearchStr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { User } = useSelector((state) => state.User);
  const [cookies, , removeCookie] = useCookies(["token"]);

  function onClickHandeler() {
    dispatch(searchQuery(searchStr.trim()));
    navigate("/");
  }

  const checkCookies = useCallback(() => {
    if (!User && cookies?.token) {
      dispatch(setUser(cookies?.token));
    } else if (!cookies?.token) {
      dispatch(setUser(null));
    }
  }, [dispatch, cookies, User]);

  useEffect(() => {
    checkCookies();
  }, [dispatch, cookies, User, checkCookies]);

  return (
    <div className="flex px-3 h-16 items-center bg-blue-700 justify-between header">
      <Link to={"/"}>
        <div className="flex items-center justify-center gap-3">
          <BsCart4 size={30} className="text-white" />
          <h1 className="font-bold text-yellow-300 text-3xl">Flash Sale</h1>
        </div>
      </Link>
      <div className="relative w-1/3 flex items-center">
        <input
          className="rounded h-8 pl-5 pr-8 focus:outline-none w-full"
          type="text"
          value={searchStr}
          onChange={(e) => {
            setSearchStr(e.target.value);
            console.log(e.target.value);
          }}
          placeholder="Search Products..."
        />
        <BsSearch
          size={20}
          className="absolute right-2 cursor-pointer"
          onClick={onClickHandeler}
        />
      </div>
      {User ? (
        <div className="flex items-center">
          <div></div>
          <div className="flex justify-center items-center rounded-full bg-green-400 w-9 h-9 border-transparent hover:border-gray-200 border-2 group relative cursor-pointer">
            {User?.name?.fname[0]?.toUpperCase()}
            {User?.name?.lname[0]?.toUpperCase()}
            <div className="absolute top-8  right-0 hidden group-hover:block pt-2 w-10">
              <div className="px-4 py-3 bg-slate-200 absolute right-0 rounded-md">
                <div>
                  <div className="flex gap-3 items-center mb-4">
                    <div className="rounded-full bg-green-400 flex justify-center items-center w-10 h-10">
                      {User?.name?.fname[0]?.toUpperCase()}
                      {User?.name?.lname[0]?.toUpperCase()}
                    </div>
                    {User?.type === "admin" && (
                      <span className="font-bold text-xs border-2 rounded-md px-2 py-1 border-gray-600">
                        Admin
                      </span>
                    )}
                  </div>
                  <h1 className="font-semibold ">{User?.email}</h1>
                  <hr className="border-collapse border-gray-400 mt-3" />
                  <button
                    className="ml-1"
                    onClick={() => {
                      removeCookie("token");
                    }}
                  >
                    <FiLogOut size={15} className="inline-block" />{" "}
                    <span className="font-medium">logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <Link to={"/login"}>
            <button className="bg-white px-4 py-1 rounded text-blue-700 mr-5 font-semibold">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
