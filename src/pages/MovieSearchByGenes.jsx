import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchMovieCard from "../components/SearchMovieCard";
import { Toaster } from "react-hot-toast";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";

const MovieSearchByGenes = () => {
  const { state } = useLocation();
  const [isDone, setIsDone] = useState(false);
  const [data, setData] = useState([]);
  const jonar = state?.jonar || "";
  const type = state?.type || "";
  const [page, setPage] = useState(1);
  const [searchMovies, setsearchMovies] = useState([]);
  const key = process.env.REACT_APP_TMDB_Key;
  // console.log(type);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${key}&with_genres=${jonar.id}&page=${page}`
      )
      .then((res) => {
        setData(() => {
          let tempmovie = res.data.results.filter(
            (item) => item.backdrop_path !== null
          );

          if (tempmovie.length === 0) return res.data.results;
          return tempmovie;
        });
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [jonar, page]);

  useEffect(() => {
    // console.log(data);
    const tempMovies = data;
    const sortedMovies = tempMovies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setsearchMovies(sortedMovies);
    const timeout = setTimeout(() => {
      setIsDone(true);
    }, 2000);
    return () => clearTimeout(timeout);
    // console.log(searchMovies);
  }, [data]);

  return (
    <>
      <Navbar type={type} />
      {isDone === true ? (
        <div>
          <div className=" text-white flex sm:flex-row flex-col items-center m-5">
            <p className="text-xl ml-5 mr-3">You search For :-</p>
            <h1 className="text-3xl font-bold text-white">{jonar.name}</h1>
          </div>
          {searchMovies.length !== 0 ? (
            <div className="flex sm:flex-row flex-col flex-wrap">
              {searchMovies.map((item, id) => (
                <SearchMovieCard key={id} item={item} type={type} />
              ))}
            </div>
          ) : (
            <div className="text-white flex text-center justify-center sm:text-3xl text-xl">
              We are Sorry. We Don't find any such {type==="tv"?"TV Show":"Movie"}...
            </div>
          )}
        </div>
      ) : (
        <div className="text-white flex justify-center text-3xl">
          Please Wait while we are searching....
        </div>
      )}
      <div className="text-white m-2 flex justify-center items-center text-xl">
        Page:-
        <div className="flex mx-1 items-center">
          <p
            className="m-1 px-1 cursor-pointer"
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          >
            -
          </p>
          <p className="m-2 text-2xl">{page}</p>
          <p className="m-2 text-2xl">/ 500</p>
          <p
            className="m-1 px-1 cursor-pointer"
            onClick={() => {
              if (page < 500) setPage(page + 1);
            }}
          >
            +
          </p>
        </div>
      </div>
      <Toaster />
      <Feedback />
      <Footer />
    </>
  );
};

export default MovieSearchByGenes;
