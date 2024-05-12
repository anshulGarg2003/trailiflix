import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../Context/AuthContext";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const SavedShows = ({ type }) => {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);
  const [tvshow, setTVShow] = useState([]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });

    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setTVShow(doc.data()?.savedTVShows);
    });
  }, [user?.email]);

  const showRef = doc(db, "users", `${user?.email}`);
  const deleteMovieShow = async (passedId) => {
    try {
      const result = movies.filter((item) => item.id != passedId);
      await updateDoc(showRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTVShow = async (passedId) => {
    try {
      const result = tvshow.filter((item) => item.id != passedId);
      await updateDoc(showRef, {
        savedTVShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="">
          <div className="flex justify-center">
            <h2 className="text-white font-bold text-xl sm:text-2xl my-3 flex ">
              Liked Movies
            </h2>
          </div>
          {movies?.length !== 0 ? (
            movies?.map((item, id) => (
              <>
                <Link to={`/movie/${item.id}`}>
                  <div className="relative flex items-center group">
                    <MdChevronLeft
                      onClick={slideLeft}
                      size={40}
                      className="bg-black left-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                    />
                    <div
                      id={"slider"}
                      className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                    >
                      <div
                        key={id}
                        className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                      >
                        <img
                          className="w-full h-auto text-2xl"
                          src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                          alt={item?.title}
                        />
                        <div className="absolute w-full h-full top-0 left-0 hover:bg-black/60 opacity-0 hover:opacity-100 text-white justify-center items-center text-center">
                          <p className="w-full white-space-normal test-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                            {item?.title}
                          </p>
                          <p
                            onClick={() => deleteMovieShow(item.id)}
                            className="absolute text-gray-300 top-4 right-4"
                          >
                            <AiOutlineClose />
                          </p>
                        </div>
                      </div>
                    </div>
                    <MdChevronRight
                      onClick={slideRight}
                      size={40}
                      className="bg-black right-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                    />
                  </div>
                </Link>
              </>
            ))
          ) : (
            <div className="flex justify-center text-xl sm:text-2xl text-gray-600">
              Empty!!!
            </div>
          )}
        </div>
      </div>
      <div className="mb-5">
        <div className="flex justify-center">
          <h2 className="text-white font-bold md:text-xl my-3 ">
            Liked TV Shows
          </h2>
        </div>
        {tvshow?.length !== 0 ? (
          tvshow?.map((item, id) => (
            <>
              <div className="relative flex items-center group">
                <MdChevronLeft
                  onClick={slideLeft}
                  size={40}
                  className="bg-black left-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                />
                <div
                  id={"slider"}
                  className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                >
                  <div
                    key={id}
                    className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                  >
                    <img
                      className="w-full h-auto text-2xl"
                      src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                      alt={item?.title}
                    />
                    <div className="absolute w-full h-full top-0 left-0 hover:bg-black/60 opacity-0 hover:opacity-100 text-white justify-center items-center text-center">
                      <p className="w-full white-space-normal test-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                        {item?.name}
                      </p>
                      <p
                        onClick={() => deleteTVShow(item.id)}
                        className="absolute text-gray-300 top-4 right-4"
                      >
                        <AiOutlineClose />
                      </p>
                    </div>
                  </div>
                </div>
                <MdChevronRight
                  onClick={slideRight}
                  size={40}
                  className="bg-black right-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                />
              </div>
            </>
          ))
        ) : (
          <div className="flex justify-center text-xl sm:text-2xl text-gray-600">
            Empty!!!
          </div>
        )}
      </div>
    </>
  );
};

export default SavedShows;
