import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { IoSearch } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (search.length !== 0) {
      navigate(`/search/${search}`, { state: { search } });
    }
  };

  return (
    <div className="flex justify-between p-4 z-[100] w-full items-center">
      <Link to="/home">
        <div className="text-red-600 text-5xl font-extrabold  cursor-pointer">
          TRAILIFLIX
        </div>
      </Link>
      <div className="bg-transparent w-[50%] p-2 border rounded-2xl items-center">
        <div className="flex justify-start m-3 h-8 items-center">
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
            className="bg-transparent w-full items-center font-bold text-xl text-center rounded-xl text-white p-2"
            placeholder="Looking for Something???"
            type="text"
          />
          <IoSearch className="ml-3 items-center align-middle text-white text-3xl" />
        </div>
      </div>
      <div className="flex">
        <Link to="/account">
          <div className="text-white mr-4 px-2 py-1 rounded cursor-pointe text-3xl focus:outline-none">
            <VscAccount />
          </div>
        </Link>
        <button
          onClick={handleLogOut}
          className="bg-red-600 px-2 py-1 rounded cursor-pointer text-xl"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
