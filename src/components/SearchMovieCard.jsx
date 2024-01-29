import React from "react";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

const SearchMovieCard = ({ item }) => {
  return (
    <div key={item.id} className="relative group sm:w-[31.3%] m-3 overflow-hidden">
      <img
        className="w-full h-auto object-cover transition-transform transform group-hover:scale-125"
        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className=" cursor-pointer absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to={`/movie/${item.id}`}>
          <div className="absolute inset-0 flex flex-col text-center">
            <p className="text-white text-xs flex items-center justify-center flex-1 md:text-sm font-bold">
              {item?.title}
            </p>
            <div className="text-white text-xs flex flex-3 m-5 font-bold">
              <p>{item.vote_average?.toFixed(1)}</p>
              <IoStar className="text-yellow-500" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchMovieCard;
