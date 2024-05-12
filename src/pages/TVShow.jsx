import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { UserAuth } from "../Context/AuthContext";
import { IoStar } from "react-icons/io5";
import MovieCard from "../components/MovieCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { FaArrowDown } from "react-icons/fa6";
import CastCard from "../components/CastCard";
import { FaArrowUp } from "react-icons/fa";
import ReviewCard from "../components/ReviewCard";
import TVShowCard from "../components/TVShowCard";

const TVShow = () => {
  const [show, setShow] = useState({});
  const [video, setVideo] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const { showId } = useParams();
  const { user } = UserAuth();
  // const showID = doc(db, "users", `${user?.email}`);
  const [dataReceived, setDataReceived] = useState(false);
  const [data, setData] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [downArrow, setDownArrow] = useState(false);
  const [tempshowCast, setTempshowCast] = useState([]);
  const [showCast, setshowCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [screenshot, setScreenshot] = useState([]);
  const navigate = useNavigate();
  // const [isDone, setIsDone] = useState(false);

  const key = process.env.REACT_APP_TMDB_Key;
  // console.log(showId)

  const handleDropDown = (e) => {
    e.preventDefault();
    setDownArrow(!downArrow);
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${showId}?api_key=${key}`)
      .then((res) => {
        setShow(res.data);
        console.log(show);
        setDataReceived(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`https://api.themoviedb.org/3/tv/${showId}/videos?api_key=${key}`)
      .then((res) => {
        console.log(res.data.results);
        setVideo(() => {
          let tempVideo = res.data.results.filter(
            (item) => item.type === "Trailer"
          );

          if (tempVideo.length === 0) {
            tempVideo = res.data.results.filter(
              (item) => item.type === "Teaser"
            );
          }
          if (tempVideo.length === 0) return res.data.results;
          return tempVideo;
        });

        setIsDone(true);

        // console.log(video);
        const timeout = setTimeout(() => {
          setShowVideo(true);
        }, 2000);
        return () => clearTimeout(timeout);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(`https://api.themoviedb.org/3/tv/${showId}/credits?api_key=${key}`)
      .then((res) => {
        setTempshowCast(res.data.cast);
        // console.log(tempshowCast);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://api.themoviedb.org/3/tv/${showId}/reviews?api_key=${key}`)
      .then((res) => {
        setReviews(res.data.results);
        console.log(reviews);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://api.themoviedb.org/3/tv/${showId}/images?api_key=${key}`)
      .then((res) => {
        // console.log(res.data.backdrops);
        setScreenshot(() => {
          let sortedPhotos = res.data.backdrops.sort(
            (a, b) => b.vote_average - a.vote_average
          );
          return sortedPhotos.slice(0, 21);
        });
        console.log(screenshot);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showId, key]);

  useEffect(() => {
    let sortedCast = tempshowCast.sort((a, b) => b.popularity - a.popularity);
    sortedCast = sortedCast.filter((item) => item.popularity >= 0);
    sortedCast = sortedCast.filter((item) => item.profile_path !== null);
    setshowCast(sortedCast);
  }, [tempshowCast]);

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} min`;
    } else {
      return `${hours} hr ${remainingMinutes} min`;
    }
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const opts = {
    height: windowWidth > 768 ? "500" : "200",
    width: "100%",
    playerVars: {
      autoplay: 0,
      // control: 0,
    },
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${showId}/similar?api_key=${key}`)
      .then((res) => {
        console.log(res.data.results);
        setRecommendation(() => {
          let tempshow = res.data.results.filter(
            (item) => item.backdrop_path !== null
          );

          if (tempshow.length === 0) return res.data.results;
          return tempshow;
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [showId, , dataReceived, key]);

  const handleGeneSelect = (jonar) => {
    navigate(`/search/genes/${jonar.name}`, { state: { type: "tv", jonar } });
  };

  return (
    <>
      <Navbar type={"tv"} />
      {dataReceived === true ? (
        showVideo === false ? (
          <div className="w-full h-[650px] sm:h-screen text-white mb-2 items-end ">
            <div className="">
              <div className="absolute w-full h-[650px] sm:h-screen bg-gradient-to-r from-black"></div>
              <img
                className="w-full h-[650px] sm:h-screen object-fill"
                src={`https://image.tmdb.org/t/p/original${show?.backdrop_path}`}
                alt={show?.original_name}
              />
              <div className="absolute bottom-0 ">
                <div className="flex items-center">
                  <h1 className="text-xl sm:text-3xl font-bold m-2">
                    {show?.name}
                  </h1>
                  <span className="mx-1">|</span>
                  <p className="mr-1">{show.vote_average?.toFixed(1)}</p>
                  <IoStar className="text-yellow-500" />
                </div>
                <div className="mt-2 m-2 text-sm sm:text-xl">
                  <p>Total Season: {show?.number_of_seasons}</p>
                  <p>Total Episodes: {show?.number_of_episodes}</p>
                </div>
                <p className="mt-2 w-full flex justify-center m-2">
                  {show?.overview}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-md m-2 flex flex-col justify-center items-center">
            <div className="flex flex-col sm:flex-row items-center ">
              <div className="sm:w-[50%] w-full h-full">
                {isDone === true && video.length !== 0 ? (
                  <YouTube
                    className="m-3 flex items-center justify-center"
                    videoId={video[0]?.key}
                    opts={opts}
                  />
                ) : (
                  <p className="flex items-center text-white text-2xl justify-center">
                    Sorry Can't Fetch the trailer...
                  </p>
                )}
              </div>
              <div className="text-white mb-2 flex sm:flex-row flex-col m-5 mt-2 sm:w-[50%] ">
                <div className="w-[100%]  ">
                  <div className="flex sm:flex-row flex-col sm:items-center">
                    <h1 className="sm:text-3xl text-xl font-bold m-2">
                      {show?.name}
                    </h1>
                    <div className="flex sm:flex-row m-2 sm:items-center"></div>
                  </div>
                  <div className="mt-2 text-md m-2 sm:text-xl items-center">
                    <div className="flex items-center">
                      <p className="mr-1">{show.vote_average?.toFixed(1)}</p>
                      <IoStar className="text-yellow-500 " />
                    </div>
                    <p>First Season Date: {show?.first_air_date}</p>
                    <p>Last Season Date: {show?.last_air_date}</p>
                    <p>Total Season: {show?.number_of_seasons}</p>
                    <p>Total Episodes: {show?.number_of_episodes}</p>
                    <div className="flex flex-wrap">
                      {show.genres.map((jonar, id) => (
                        <div
                          key={id}
                          className="mt-2 mr-2 p-2 pl-3 pr-3 bg-gray-900 border rounded-md text-white cursor-pointer hover:scale-125 transition-transform"
                          onClick={() => handleGeneSelect(jonar)}
                        >
                          {jonar.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row text-justify items-center ring-red-500">
                    <p className="mt-2 w-full pr-5 mb-1">{show?.overview}</p>
                    <img
                      className="w-[200px] shadow-md"
                      src={`https://image.tmdb.org/t/p/original${show?.poster_path}`}
                      alt={show?.original_name}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`text-3xl hover:bg-gray-800 cursor-pointer text-white flex justify-center border rounded-full m-2 w-[5%] ${
                downArrow ? "hidden" : "block"
              } `}
            >
              <FaArrowDown className="p-1" onClick={handleDropDown} />
            </div>
            <div
              className={`text-white ${
                downArrow ? "block" : "hidden"
              } transition-height duration-500 ease-in-out justify-center w-full group `}
            >
              <h1 className="text-white text-3xl text-center">Star Cast</h1>
              <div>
                {showCast.length !== 0 ? (
                  // Content to show when showCast.length is not
                  <>
                    <div className=" flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {showCast.map((item, key) => (
                        <CastCard key={key} item={item} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="flex justify-center">
                    Please Wait while it's Loading
                  </p>
                )}
              </div>
              <div className="my-2">
                <h1 className="text-white text-3xl text-center my-2">
                  Reviews
                </h1>
                {reviews?.length !== 0 ? (
                  <div className="  flex flex-col overflow-y-auto scroll-smooth scrollbar-hide h-[500px] sm:justify-center">
                    {reviews?.map((item, key) => (
                      <ReviewCard key={key} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-white flex justify-center items-center">
                    Be the first one to comment...
                  </div>
                )}
              </div>
              <div className="my-2">
                <h1 className="text-white text-3xl text-center my-2">
                  ScreenShots
                </h1>
                {screenshot?.length !== 0 ? (
                  <div key={key} className="m-3 flex flex-wrap justify-center ">
                    {screenshot.map((item, key) => (
                      <>
                        <img
                          src={`https://image.tmdb.org/t/p/original${item.file_path}`}
                          alt=""
                          className="sm:w-[28%] m-3 hover:scale-125 transition-transform cursor-pointer"
                          onClick={() =>
                            window.open(
                              `https://image.tmdb.org/t/p/original${item.file_path}`,
                              "_blank"
                            )
                          }
                        />
                      </>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div
              className={`text-3xl hover:bg-gray-800 cursor-pointer text-white flex justify-center border rounded-full m-2 w-[5%] ${
                downArrow ? "block" : "hidden"
              } `}
            >
              <FaArrowUp className="p-1" onClick={handleDropDown} />
            </div>
          </div>
        )
      ) : (
        <div className="text-white flex justify-center text-3xl">
          Please Wait while it Load...
        </div>
      )}

      <div className="w-full">
        <h2 className="text-white font-bold md:text-xl my-3 m-1 ">
          Similar shows
        </h2>
        <div className="relative flex items-center group">
          <MdChevronLeft
            onClick={slideLeft}
            size={40}
            className="bg-white left-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          />
          <div
            id={"slider"}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {recommendation.map((item, id) => (
              <TVShowCard key={id} item={item} type="tv" />
            ))}
          </div>
          <MdChevronRight
            onClick={slideRight}
            size={40}
            className="bg-white right-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          />
        </div>
      </div>
      <Toaster />
      <Feedback />
      <Footer />
    </>
  );
};

export default TVShow;
