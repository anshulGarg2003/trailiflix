import React from "react";
import { BsEmojiFrownFill } from "react-icons/bs";
import Navbar from "../components/Navbar";
const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <div className="text-white flex flex-col justify-center items-center h-[100%] mt-5 mb-5">
        <h1 className="text-5xl items-center m-2">404 Error </h1>
        <p className="text-3xl m-2">Page Not Found</p>
        <BsEmojiFrownFill className="text-7xl flex items-center" />
      </div>
    </>
  );
};

export default ErrorPage;
