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

const Movie = () => {
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const { movieId } = useParams();
  const { user } = UserAuth();
  const [dataReceived, setDataReceived] = useState(false);
  const [data, setData] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [downArrow, setDownArrow] = useState(false);
  const [tempmovieCast, setTempMovieCast] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [screenshot, setScreenshot] = useState([]);
  // const [isDone, setIsDone] = useState(false);

  const key = process.env.REACT_APP_TMDB_Key;
  const navigate = useNavigate();
  // console.log(movieId)

  const handleDropDown = (e) => {
    e.preventDefault();
    setDownArrow(!downArrow);
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`)
      .then((res) => {
        setDataReceived(true);
        setMovie(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}`
      )
      .then((res) => {
        // console.log(res.data.results);
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
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}`
      )
      .then((res) => {
        setTempMovieCast(res.data.cast);
        // console.log(tempmovieCast);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${key}`
      )
      .then((res) => {
        console.log(res.data.results);
        setReviews(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${key}`
      )
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
  }, [movieId, key]);

  useEffect(() => {
    let sortedCast = tempmovieCast.sort((a, b) => b.popularity - a.popularity);
    sortedCast = sortedCast.filter((item) => item.popularity >= 10);
    sortedCast = sortedCast.filter((item) => item.profile_path !== null);
    console.log(sortedCast);
    setMovieCast(sortedCast);
  }, [tempmovieCast]);

  const handleGeneSelect = (jonar) => {
    navigate(`/search/genes/${jonar.name}`, {
      state: { type: "movie", jonar },
    });
  };

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
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${key}`
      )
      .then((res) => {
        // console.log(res.data.results);
        setRecommendation(() => {
          let tempmovie = res.data.results.filter(
            (item) => item.backdrop_path !== null
          );

          if (tempmovie.length === 0) return res.data.results;
          return tempmovie;
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [movieId, , dataReceived, key]);

  return (
    <>
      <Navbar type={"movie"} />
      {dataReceived === true ? (
        showVideo === false ? (
          <div className="w-full h-[650px] sm:h-screen text-white mb-2 items-end ">
            <div className="">
              <div className="absolute w-full h-[650px] sm:h-screen bg-gradient-to-r from-black"></div>
              <img
                className="w-full h-[650px] sm:h-screen object-fill"
                src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                alt={movie?.original_title}
              />
              <div className="absolute bottom-0 ">
                <div className="flex items-center">
                  <h1 className="text-xl sm:text-3xl font-bold m-2">
                    {movie?.title}
                  </h1>
                  <span className="mx-1">|</span>
                  <p className="mr-1">{movie.vote_average?.toFixed(1)}</p>
                  <IoStar className="text-yellow-500" />
                </div>
                <div className="mt-2 m-2 text-sm sm:text-xl flex items-center">
                  <p className="items-center">{formatRuntime(movie.runtime)}</p>
                  <span className="mx-1">|</span>
                  <p>Released Date: {movie?.release_date}</p>
                </div>
                <p className="mt-2 w-full flex justify-center m-2">
                  {movie?.overview}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border rounded-md m-2 flex flex-col justify-center items-center">
            <div className="flex flex-col sm:flex-row ">
              <div className="sm:w-[50%] w-full  ">
                {isDone === true ? (
                  <YouTube
                    className="m-3"
                    videoId={video[0]?.key}
                    opts={opts}
                  />
                ) : (
                  <p className="flex items-center text-white text-2xl">
                    Please Wait while Trailer is Loading...
                  </p>
                )}
              </div>
              <div className="text-white mb-2 flex sm:flex-row flex-col m-5 mt-2 sm:w-[50%] ">
                <div className="w-[100%]  ">
                  <div className="flex sm:flex-row flex-col sm:items-center">
                    <h1 className="sm:text-3xl text-xl font-bold m-2">
                      {movie?.title}
                    </h1>
                    <div className="flex sm:flex-row m-2 sm:items-center"></div>
                  </div>
                  <div className="mt-2 text-md m-2 sm:text-xl items-center">
                    <div className="flex items-center">
                      <p className="mr-1">{movie.vote_average?.toFixed(1)}</p>
                      <IoStar className="text-yellow-500 " />
                    </div>
                    <p className="items-center">
                      {formatRuntime(movie.runtime)}
                    </p>
                    <p>Released Date: {movie?.release_date}</p>
                    <div className="flex flex-wrap">
                      {movie.genres.map((jonar, id) => (
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
                    <p className="mt-2 w-full pr-5 mb-1">{movie?.overview}</p>
                    <img
                      className="w-[200px] shadow-md"
                      src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                      alt={movie?.original_title}
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
              } justify-center w-full group `}
            >
              <h1 className="text-white text-3xl text-center">Star Cast</h1>

              <div>
                {movieCast.length !== 0 ? (
                  // Content to show when movieCast.length is not
                  <>
                    <div className=" flex overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                      {movieCast.map((item, key) => (
                        <CastCard key={key} item={item} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="flex justify-center text m-3">Please Wait while it's Loading</p>
                )}
              </div>
              <div className="my-2">
                <h1 className="text-white text-3xl text-center my-2">
                  Reviews
                </h1>
                {reviews.length !== 0 ? (
                  <div className="  flex flex-col overflow-y-auto scroll-smooth scrollbar-hide h-[300px]">
                    {reviews.map((item, key) => (
                      <ReviewCard key={key} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-white flex justify-center items-center m-3">
                    Be the first one to comment...
                  </div>
                )}
              </div>
              <div className="my-2">
                <h1 className="text-white text-3xl text-center my-2">
                  ScreenShots
                </h1>
                {screenshot?.length !== 0 ? (
                  <div key={key} className="flex flex-wrap justify-center ">
                    {screenshot.map((item, key) => (
                      <>
                        <img
                          src={`https://image.tmdb.org/t/p/original${item.file_path}`}
                          alt=""
                          className="w-[28%] m-3 hover:scale-125 transition-transform cursor-pointer"
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
          Similar Movies
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
              <MovieCard key={id} item={item} />
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

export default Movie;
