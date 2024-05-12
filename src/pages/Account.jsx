import React from "react";
import SavedShows from "../components/SavedShows";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";

const Account = () => {
  const { state } = useLocation();
  const type = state?.type || "movie";
  return (
    <>
      <Navbar type={type} />
      <div className="w-full text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://qph.cf2.quoracdn.net/main-qimg-1a91da19af6e07cdf1cb039704aeb7ce-lq"
        />
        <div className="bg-black/50 absolute top-0 left-0 w-full h-[500px]">
          <div className="absolute top-[40%] p-4 md:p-8">
            <h1 className="text-3xl font-bold">My Shows</h1>
          </div>
        </div>
        <SavedShows type={type} />
      </div>
      <Feedback />
      <Footer />
    </>
  );
};

export default Account;
