import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { IoSearch } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import axios from "axios";

const Navbar = ({ type }) => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = () => {
    navigate("/login");
  };
  const handleSearch = () => {
    if (search.length !== 0) {
      console.log(search, type);
      navigate(`/search/${search}`, { state: { search, type } });
    }
  };

  return (
    <>
      <div className="m-2 hidden sm:flex">
        <div className="flex justify-between p-2 z-[100] w-full items-center">
          <div
            className="text-red-600 md:text-5xl font-extrabold  cursor-pointer text-xl mr-2"
            onClick={() => {
              user === null
                ? navigate("/")
                : navigate(`/home`, { state: { type } });
            }}
          >
            TRAILIFLIX
          </div>
          <div className="bg-transparent sm:w-[50%] p-2 border rounded-2xl items-center w-[35%] ">
            <div className="flex justify-start m-2 sm:h-8 h-3 items-center">
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                  // handleSearch();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="bg-transparent w-full items-center font-bold sm:text-xl text-sm text-center rounded-xl text-white p-2"
                placeholder="Looking for Something???"
                type="text"
              />
              <IoSearch className="sm:ml-3 items-center align-middle text-white sm:text-3xl text-sm ml-2" />
            </div>
          </div>
          <div className="flex items-center ml-2">
            <div className=" text-white flex justify-center mb-2">
              <button
                className={`m-1 p-2 rounded-md ${
                  type === "movie"
                    ? "bg-red-500 text-black"
                    : " hover:scale-110 hover:rounded-md transition-transform duration-300"
                } `}
                onClick={() => {
                  navigate(`/home`, { state: { type: "movie" } });
                }}
              >
                Movies
              </button>
              <button
                className={`m-1 p-2 rounded-md ${
                  type === "tv"
                    ? "bg-red-500 text-black"
                    : "hover:scale-110 hover:rounded-md transition-transform duration-300"
                } `}
                onClick={() => {
                  navigate(`/home`, { state: { type: "tv" } });
                }}
              >
                TV Shows
              </button>
            </div>
            {user !== null && (
              <Link to="/account" state={{ type: type }}>
                <div className="text-white mr-1 px-1 py-1 rounded cursor-pointe text-3xl focus:outline-none">
                  <VscAccount />
                </div>
              </Link>
            )}
            {user !== null ? (
              <button
                onClick={handleLogOut}
                className="bg-red-600 px-1 py-1 rounded cursor-pointer sm:text-xl text-sm"
              >
                Log Out
              </button>
            ) : (
              <button
                onClick={handleLogIn}
                className="bg-red-600 px-1 py-1 rounded cursor-pointer sm:text-xl text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="m-2 sm:hidden flex">
        <div className="p-2 z-[100] w-full">
          <div className="flex justify-between">
            <div
              className="text-red-600 md:text-5xl font-extrabold  cursor-pointer text-xl mr-2"
              onClick={() => {
                navigate(`/home`, { state: { type } });
              }}
            >
              TRAILIFLIX
            </div>
            <div className="flex">
              {user !== null && (
                <Link to="/account">
                  <div className="text-white mr-1 px-1 py-1 rounded cursor-pointe text-3xl focus:outline-none">
                    <VscAccount />
                  </div>
                </Link>
              )}
              {user !== null ? (
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 px-1 py-1 rounded cursor-pointer sm:text-xl text-sm"
                >
                  Log Out
                </button>
              ) : (
                <button
                  onClick={handleLogIn}
                  className="bg-red-600 px-1 py-1 rounded cursor-pointer sm:text-xl text-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center m-2 justify-between">
            <div className=" text-white flex justify-center mb-2">
              <button
                className={`m-1 p-2 rounded-md ${
                  type === "movie"
                    ? "bg-red-500 text-black"
                    : " hover:scale-110 hover:rounded-md transition-transform duration-300"
                } `}
                onClick={() => {
                  navigate(`/home`, { state: { type: "movie" } });
                }}
              >
                Movies
              </button>
              <button
                className={`m-1 p-2 rounded-md ${
                  type === "tv"
                    ? "bg-red-500 text-black"
                    : "hover:scale-110 hover:rounded-md transition-transform duration-300"
                } `}
                onClick={() => {
                  navigate(`/home`, { state: { type: "tv" } });
                }}
              >
                TV Shows
              </button>
            </div>
            <div className="bg-transparent sm:w-[50%] p-2 border rounded-2xl items-center w-[35%] ">
              <div className="flex justify-start m-2 sm:h-8 h-3 items-center">
                <input
                  onChange={(e) => {
                    setSearch(e.target.value);
                    // handleSearch();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="bg-transparent w-full items-center font-bold sm:text-xl text-sm text-center rounded-xl text-white p-2 "
                  placeholder="Looking for Something???"
                  type="text"
                />
                <IoSearch className="sm:ml-3 items-center align-middle text-white sm:text-3xl text-sm ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
