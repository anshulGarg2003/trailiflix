import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../RequestCall.js";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";

const LandTitle = ({ type }) => {
  const [shows, setShows] = useState([]);
  console.log(type);
  const show = shows[Math.floor(Math.random() * shows.length)];

  useEffect(() => {
    type === "movie"
      ? axios
          .get(requests.requestPopular)
          .then((res) => {
            setShows(() => {
              const filterData = res.data.results.filter(
                (item) => item.backdrop_path !== null
              );
              return filterData;
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            // Handle the error as needed, e.g., set an error state or show a message to the user.
          })
      : axios
          .get(requests.requestTVPopular)
          .then((res) => {
            setShows(res.data.results);
            console.log(shows);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            // Handle the error as needed, e.g., set an error state or show a message to the user.
          });
  }, [type]);

  const cutRestAll = (str) => {
    if (str?.length > 300) return str.slice(0, 200) + "...";
    else return str;
  };

  return (
    <div className="w-full sm:h-[500px] h-[250px] text-white mb-2">
      <div className="w-full sm:h-[500px] h-[250px] relative">
        <div className="absolute w-full h-full bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${show?.backdrop_path}`}
          alt={type === "movies" ? show?.original_title : show?.original_name}
        />
        <div className="absolute w-full h-[50%] bottom-0 sm:p-5 p-2 sm:mb-5 ">
          <h1 className="sm:text-3xl font-bold sm:mb-5 text-[18px] m-2">
            {type === "movie" ? show?.title : show?.name}
          </h1>
          <div className="sm:mt-3 flex items-center">
            <Link to={`/${type}/${show?.id}`}>
              <button className="text-black bg-gray-300 border-gray-300 sm:py-2 sm:px-5 hover:scale-125 hover:bg-red-500 hover:rounded-md transition-transform duration-300 ml-2 mr-2 p-1 ">
                Play
              </button>
            </Link>
            <button className="border text-white border-gray-300 bg-transparent sm:py-2 sm:px-5 hover:scale-125 hover:bg-red-500 hover:rounded-md transition-transform duration-300 hover:border-none hover:text-black mr-2 p-1">
              Watch Later
            </button>
          </div>
          <div className="mt-2 sm:text-xl text-sm flex items-center m-2">
            <p>{show?.vote_average.toFixed(1)}</p>
            <IoStar className="text-yellow-500" />
          </div>
          <p className="hidden sm:block mt-2 w-full sm:max-w-[70%] overflow-hidden">
            {cutRestAll(show?.overview)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandTitle;
