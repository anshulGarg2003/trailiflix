import React from "react";

const CastCard = ({ item }) => {
  return (
    <div className="cursor-pointer p-2 m-1">
      <div className="w-[170px] h-[220px]">
        <img
          className="w-[100%] h-full object-cover rounded-full"
          src={`https://image.tmdb.org/t/p/original/${item?.profile_path}`}
          alt={item.name}
        />
      </div>
      <div className="text-center text-wrap">
        <p>{item.original_name}</p>
        <p className="font-bold">{item.character}</p>
      </div>
    </div>
  );
};

export default CastCard;
