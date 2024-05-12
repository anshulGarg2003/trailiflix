import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const FormSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password should be of 6 character!!");
      return;
    }

    try {
      await signUp(email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/594f8025-139a-4a35-b58d-4ecf8fdc507c/d3c4e455-f0bf-4003-b7cd-511dda6da82a/IN-en-20240108-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          className="hidden sm:block absolute w-full h-full object-cover"
          alt="background"
        />
        <div className="bg-black/60 fixed w-full h-screen  top-0 left-0 justify-center items-center">
          <div className="w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[500px] mx-auto bg-black/70 ">
              <div className=" flex max-w-[320px] mx-auto py-16 flex-col text-white">
                <h1 className=" text-white text-3xl justify-center items-center font-bold">
                  SignUp
                </h1>
                <form
                  onSubmit={FormSubmit}
                  className="flex-col w-full flex py-4 text-gray-500 "
                >
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 my-3 bg-gray-50 text-black"
                    type="email"
                    placeholder="Email or Phone No."
                    autoComplete="email"
                  />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 my-3 bg-gray-50 text-black"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                  <button className="text-white bg-red-600 py-3 my-6 rounded font-bold">
                    Sign Up
                  </button>

                  {error ? (
                    <p className=" text-red-600 py-1 font-bold">{error}</p>
                  ) : null}

                  <div className="flex justify-between text-[18px]">
                    <p className="mr-1">
                      <input type="checkbox" /> Remember me
                    </p>
                    <p>Need Help?</p>
                  </div>
                  <p className="py-8 text-[18px]">
                    <span className="pr-1">Already a Member? </span>
                    <Link to="/logIn">SignIn</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
