import React from "react";
import { Link } from "react-router-dom";

const OutsiderNavbar = () => {
  return (
    <div className="flex justify-between p-4 z-[100] absolute w-full ">
      <Link to="/">
        <div className="text-red-600 text-5xl font-extrabold cursor-pointer">
          TRAILIFLIX
        </div>
      </Link>

      <div>
        <Link to="/account">
          <button className="text-white mr-4 px-2 py-1 rounded cursor-pointer border border-gray-300 text-xl">
            Language
          </button>
        </Link>
        <Link to="/signUp">
          <button className="bg-red-600 px-2 py-1 rounded cursor-pointer text-xl">
            SignUp
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OutsiderNavbar;
