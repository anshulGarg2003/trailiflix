import React from "react";
import SavedShows from "../components/SavedShows";
import Navbar from "../components/Navbar";

const Account = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-[400px] text-white">
        <img
          className="w-full h-[400px] object-cover"
          src="https://qph.cf2.quoracdn.net/main-qimg-1a91da19af6e07cdf1cb039704aeb7ce-lq"
        />
        <div className="bg-black/50 fixed left-0 w-full h-[300px]">
          <div className="absolute top-[40%] p-4 md:p-8">
            <h1 className="text-3xl font-bold">My Shows</h1>
          </div>
        </div>
        <SavedShows />
      </div>
    </>
  );
};

export default Account;
