import React from "react";
import LandTitle from "../components/LandTitle";
import Row from "../components/Row";
import requests from "../RequestCall";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Feedback from "../components/Feedback";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const { state } = useLocation();
  const search = state?.search || "";
  if (search !== "") {
    const SearchMovies = state?.searchMovies || [];
    console.log(search);
    console.log(SearchMovies);
  }

  return (
    <div>
      <Navbar />
      <LandTitle />
      <div>
        <Row rowId="1" title="Popular" Url={requests.requestPopular} />
        <Row rowId="2" title="Trending" Url={requests.requestNowPlaying} />
        <Row rowId="3" title="Top Rated" Url={requests.requestTopRated} />
        <Row rowId="4" title="Upcoming" Url={requests.requestUpcoming} />
      </div>
      <Toaster/>
      <Feedback/>
      <Footer />
    </div>
  );
};

export default Home;
