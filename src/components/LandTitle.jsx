import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../RequestCall.js";
import { Link } from "react-router-dom";

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
    <div className="w-full h-[500px] text-white mb-2">
      <div className="w-full h-full">
        <div className="absolute w-full h-[500px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.original_title}
        />
        <div className="absolute w-full bottom-0 p-5 mb-5">
          <h1 className="text-3xl font-bold mb-5 ">{movie?.title}</h1>
          <div className="mt-3">
            <Link to={`/movie/${movie?.id}`}>
              <button className="text-black bg-gray-300 border-gray-300 py-2 px-5 hover:scale-125 hover:bg-red-500 hover:rounded-md transition-transform duration-300   ">
                Play
              </button>
            </Link>
            <button className="border ml-5 text-white border-gray-300 bg-transparent py-2 px-5 hover:scale-125 hover:bg-red-500 hover:rounded-md transition-transform duration-300 hover:border-none hover:text-black">
              Watch Later
            </button>
          </div>
          <p className="mt-2 test-sm">Released Date: {movie?.release_date}</p>
          <p className="mt-2 w-full md:max-w-[70%]">
            {cutRestAll(movie?.overview)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandTitle;
