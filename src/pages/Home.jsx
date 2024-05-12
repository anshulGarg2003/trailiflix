import React, { useState } from "react";
import LandTitle from "../components/LandTitle";
import Row from "../components/Row";
import requests from "../RequestCall";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Feedback from "../components/Feedback";
import TVRow from "../components/TVRow";
import Choices from "../components/Choices";

const Home = () => {
  const { state } = useLocation();
  const type = state?.type || "movie";
  // console.log(type);
  return (
    <div>
      <Navbar type={type} />
      <Choices type={type} />
      <LandTitle type={type} />
      <div>
        {type === "movie" ? (
          <>
            <Row rowId="1" title="Popular" Url={requests.requestPopular} />
            <Row rowId="2" title="Trending" Url={requests.requestNowPlaying} />
            <Row rowId="3" title="Top Rated" Url={requests.requestTopRated} />
            <Row rowId="4" title="Upcoming" Url={requests.requestUpcoming} />
          </>
        ) : (
          <>
            <TVRow
              rowId="1"
              title="Airing Today"
              Url={requests.requestAiringToday}
            />
            <TVRow
              rowId="2"
              title="On The Air"
              Url={requests.requestOnTheAir}
            />
            <TVRow rowId="4" title="Popular" Url={requests.requestTVPopular} />
            <TVRow
              rowId="3"
              title="Top Rated"
              Url={requests.requestTVTopRated}
            />
          </>
        )}
      </div>
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;
