import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const Movie = () => {
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState([]);
  const [showVideo, setShowVideo] = useState(true);
  const { movieId } = useParams();
  const { user } = UserAuth();
  const movieID = doc(db, "users", `${user?.email}`);
  const [dataReceived, setDataReceived] = useState(false);
  const [data, setData] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [isDone, setIsDone] = useState(false);

  const key = process.env.REACT_APP_TMDB_Key;
  // console.log(movieId)

  const saveShow = async () => {
    await updateDoc(movieID, {
      savedShows: arrayUnion({
        id: movie.id,
        title: movie.title,
        img: movie.backdrop_path,
      }),
    });
  };
  // console.log(movie.genres);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`)
      .then((res) => {
        setDataReceived(true);
        setMovie(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}`
      )
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
            if (tempVideo.length === 0) return res.data.results;
          }
          return tempVideo;
        });
        setIsDone(true);

        console.log(video);
        const timeout = setTimeout(() => {
          // setShowVideo(true);
        }, 2000);
        return () => clearTimeout(timeout);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [movieId, key]);

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
      autoplay: 1,
      // control: 0,
    },
  };

  useEffect(() => {
    if (movie && movie.genres) {
      const selectedMovieGenres = movie?.genres.map((genre) => genre.id);

      // Fetch recommendations based on the genres of the selected movie
      const genreRequests = selectedMovieGenres?.map((genreId) =>
        axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}`
        )
      );

      Promise.all(genreRequests)
        .then((responses) => {
          const recommendationResults = responses?.map(
            (res) => res.data.results
          );
          const combinedResults = recommendationResults.flat();
          setData(combinedResults);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [movie, , dataReceived, key]);

  useEffect(() => {
    const uniqueMovies = Array.from(new Set(data.map((movie) => movie.id))).map(
      (id) => data.find((movie) => movie.id === id)
    );
    const sortedMovies = uniqueMovies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    const top20Movies = sortedMovies.slice(0, 20);
    // console.log(top20Movies);
    setRecommendation(top20Movies);
  }, [data]);

  return (
    <>
      <Navbar />
      {dataReceived === true ? (
        showVideo === false ? (
          <div className="w-full h-[650px] sm:h-screen text-white mb-2 items-end ">
            <div className="">
              <div className="absolute w-full h-[650px] sm:h-screen bg-gradient-to-r from-black"></div>
              <img
                className="w-full h-[650px] sm:h-screen object-cover"
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
          <div>
            <div className="flex flex-col sm:flex-row border rounded-md m-2">
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
                    <h1 className="sm:text-3xl text-xl font-bold m-2">{movie?.title}</h1>
                    <div className="flex sm:flex-row m-2 sm:items-center">
                      <span className="m-2 hidden sm:block">|</span>
                      <p className="mr-1">{movie.vote_average?.toFixed(1)}</p>
                      <IoStar className="text-yellow-500 " />
                    </div>
                  </div>
                  <div className="mt-2 text-md m-2 sm:text-xl items-center">
                    <p className="items-center">
                      {formatRuntime(movie.runtime)}
                    </p>
                    <p>Released Date: {movie?.release_date}</p>
                    <div className="flex flex-wrap">
                      {movie.genres.map((jonar, id) => (
                        <div
                          key={id}
                          className="mt-2 mr-2 p-2 pl-3 pr-3 bg-gray-900 border rounded-md text-white"
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
