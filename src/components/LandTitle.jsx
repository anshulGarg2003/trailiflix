import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../RequestCall.js";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";

const LandTitle = () => {
  const [movies, setmovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((res) => {
        setmovies(res.data.results);
        console.log(movie);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error as needed, e.g., set an error state or show a message to the user.
      });
  }, []);

  const cutRestAll = (str) => {
    if (str?.length > 300) return str.slice(0, 200) + "...";
    else return str;
  };

  // console.log(movie);

  return (
    <div className="w-full sm:h-[500px] h-[250px] text-white mb-2">
      <div className="w-full sm:h-[500px] h-[250px] relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.original_title}
        />
        <div className="absolute w-full h-[50%] bottom-0 sm:p-5 p-2 sm:mb-5 ">
          <h1 className="sm:text-3xl font-bold sm:mb-5 text-[18px] m-2">
            {movie?.title}
          </h1>
          <div className="sm:mt-3 flex items-center">
            <Link to={`/movie/${movie?.id}`}>
              <button className="text-black bg-gray-300 border-gray-300 sm:py-2 sm:px-5 hover:scale-125 hover:bg-red-500 hover:rounded-md transition-transform duration-300 ml-2 mr-2 p-1 ">
                Play
              </button>
            </Link>
            <button className="border text-white border-gray-300 bg-transparent sm:py-2 sm:px-5 hover:scale-125 hover:bg-red-500 hover:rounded-md transition-transform duration-300 hover:border-none hover:text-black mr-2 p-1">
              Watch Later
            </button>
          </div>
          <div className="mt-2 sm:text-xl text-sm flex items-center m-2">
            <p>{movie?.vote_average.toFixed(1)}</p>
            <IoStar className="text-yellow-500" />
          </div>
          <p className="hidden sm:block mt-2 w-full sm:max-w-[70%] overflow-hidden">
            {cutRestAll(movie?.overview)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandTitle;
