import React, { useState } from "react";
import OutsiderNavbar from "../components/OutsiderNavbar";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { aboutData } from "../data";
import toast from "react-hot-toast";

const Outsider = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const data = aboutData;

  const { logIn } = UserAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (email !== "") {
      setDone(true);
    } else {
      toast.error("Enter Email first!!");
    }
  };

  const handleFinal = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <OutsiderNavbar />
      <div className="w-full h-screen mb-10">
        <img
          className="w-full h-screen object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/1*5lyavS59mazOFnb55Z6znQ.png"
          alt="background"
        />
        <div className="bg-black/60 absolute w-full h-full top-0 left-0"></div>
        <div className="w-full h-full absolute top-[45%] text-white justify-center items-center text-center ">
          <h1 className=" items-center font-bold text-5xl flex text-center justify-center">
            Endless movies, TV shows, and a variety of entertainment.
          </h1>
          <p className="p-3 text-2xl justify-center items-center text-center">
            Stream from any location. End your subscription at any time.
          </p>
          <p className="pt-4 text-2xl justify-center items-center text-center">
            Ready to watch? Enter your email to dive into the ocean of
            entertainment...
          </p>
          {!done && (
            <>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-[25%] p-1 text-2xl align-middle m-1 bg-transparent/60 "
                onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
                placeholder="Email Address"
                type="email"
              />
              <button
                onClick={handleClick}
                
                className="w-[10%] text-white bg-red-600 py-3 my-3 p-2 rounded font-bold"
              >
                Get Started
              </button>
            </>
          )}
          {done && (
            <>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-[25%] p-1 text-2xl align-middle m-1 bg-transparent/60 "
                placeholder=" Enter Password"
                type="password"
                autoComplete="current-password"
                onKeyDown={(e) => e.key === "Enter" && handleFinal(e)}
              />
              <button
                onClick={handleFinal}
                className="w-[10%] text-white bg-red-600 py-3 my-3 p-2 rounded font-bold"
              >
                Go
              </button>
            </>
          )}
          {error ? (
            <p className=" text-red-600 py-1 font-bold">{error}</p>
          ) : null}
        </div>
      </div>
      {data.map((item, id) => (
        <div
          key={id}
          className="m-2 my-[150px] p-2 flex justify-between items-center"
        >
          {id % 2 === 0 ? (
            <div className="ml-3 flex justify-around items-center">
              <img className="w-[40%]" src={item.gif} alt="" />
              <div className="text-right flex-3">
                <h1 className="text-white text-4xl font-bold py-2">
                  {item.title}
                </h1>
                <p className="text-white text-3xl whitespace-normal text-right">
                  {item.desc}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className=" flex-3 ml-5 text-left">
                <h1 className="text-white text-4xl font-bold py-2">
                  {item.title}
                </h1>
                <p className="text-white text-3xl mt-2">{item.desc}</p>
              </div>
              <img className="mr-7 w-[80%]" src={item.gif} alt="" />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Outsider;
