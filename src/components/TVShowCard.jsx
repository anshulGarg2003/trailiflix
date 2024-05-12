import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../Context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const TVShowCard = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedTVShows: arrayUnion({
          id: item.id,
          name: item.name,
          img: item.backdrop_path,
        }),
      });
    } else {
      toast.error("Please Log In to save the show!");
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.original_name}
      />
      <div className="absolute w-full h-full top-0 left-0 hover:bg-black/60 opacity-0 hover:opacity-100 text-white justify-center items-center text-center">
        <Link to={`/tv/${item.id}`}>
          <p className="w-[90%] whitespace-normal test-xs md:text-sm font-bold flex justify-center items-center h-full ">
            {item?.name}
          </p>
        </Link>
        <p onClick={saveShow} className="absolute top-3 left-3 text-gray-300">
          {like ? <FaHeart /> : <FaRegHeart />}
        </p>
      </div>
    </div>
  );
};

export default TVShowCard;
