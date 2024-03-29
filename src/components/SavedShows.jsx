import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../Context/AuthContext";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = () => {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);

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
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedId) => {
    try {
      const result = movies.filter((item) => item.id != passedId);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl my-3 ">Liked Shows</h2>
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
          {movies &&
            movies.map((item, id) => (
              <div
                key={id}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
              >
                <img
                  className="w-full h-auto"
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                />
                <div className="absolute w-full h-full top-0 left-0 hover:bg-black/60 opacity-0 hover:opacity-100 text-white justify-center items-center text-center">
                  <p className="w-full white-space-normal test-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                  </p>
                  <p
                    onClick={() => deleteShow(item.id)}
                    className="absolute text-gray-300 top-4 right-4"
                  >
                    <AiOutlineClose />
                  </p>
                </div>
              </div>
            ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="bg-black right-1 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default SavedShows;
