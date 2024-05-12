import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";

const ReviewCard = ({ item }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const formatDate = (originalDate) => {
    const parsedDate = new Date(originalDate);

    const day = parsedDate.getDate();
    const monthNumber = parsedDate.getMonth() + 1;
    const year = parsedDate.getFullYear();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[monthNumber - 1];
    const formattedDate = `${day} ${monthName} ${year}`;

    return formattedDate;
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };
  return (
    <>
      <div className="border  m-2 text-white">
        <div className="p-2 border flex justify-between items-center ">
          <div className="flex items-center">
            {item.author_details.avatar_path !== null ? (
              <img
                src={`https://image.tmdb.org/t/p/original${item.author_details.avatar_path}`}
                alt={item.author_details.username}
                className="w-[30px] h-[30px] rounded-full mr-1 px-1 py-1"
              />
            ) : (
              <div className="text-white mr-1 px-1 py-1 rounded cursor-pointe text-3xl focus:outline-none">
                <VscAccount />
              </div>
            )}
            <p className="text-white">
              {item.author !== "" ? item.author : item.author_details.username}
            </p>
          </div>
          <div>{formatDate(item.updated_at)}</div>
        </div>
        <div className="w-full text-wrap m-2 p-2 pr-5 flex flex-col items-start text-justify">
          <div>
            {showFullContent
              ? item.content
              : `${item.content.slice(0, 200)}...`}
          </div>
          <div>
            <button
              onClick={toggleContent}
              className="text-blue-500 hover:underline focus:outline-none cursor-pointer"
            >
              {showFullContent ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
