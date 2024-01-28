import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchMovieCard from "../components/SearchMovieCard";
import { Toaster } from "react-hot-toast";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";

const MovieSearch = () => {
  const { state } = useLocation();
  const [isDone, setIsDone] = useState(false);
  const [data, setData] = useState([]);
  const search = state?.search || "";
  // console.log(search);
  const [searchMovies, setsearchMovies] = useState([]);
  const key = process.env.REACT_APP_TMDB_Key;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${key}`
      )
      .then((res) => {
        setData(() => {
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
  }, [search]);

  useEffect(() => {
    // console.log(data);
    const tempMovies = data;
    const sortedMovies = tempMovies.sort((a, b) => b.popularity - a.popularity);
    setsearchMovies(sortedMovies);
    setIsDone(true);
    // console.log(searchMovies);
  }, [data]);

  return (
    <>
      <Navbar />
      {isDone === true ? (
        <div>
          <div className=" text-white flex items-center m-5">
            <p className="text-xl ml-5 mr-3">You search For :-</p>
            <h1 className="text-3xl font-bold text-white">{search}</h1>
          </div>
          {searchMovies.length !== 0 ? (
            <div className="flex flex-wrap">
              {searchMovies.map((item, id) => (
                <SearchMovieCard key={id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-white flex justify-center text-3xl">
              We are Sorry. We Don't find any such movie...
            </div>
          )}
        </div>
      ) : (
        <div className="text-white flex justify-center text-3xl">
          Please Wait while we are searching....
        </div>
      )}
      <Toaster />
      <Feedback />
      <Footer />
    </>
  );
};

export default MovieSearch;
