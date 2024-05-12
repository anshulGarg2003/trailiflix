import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Choices = ({ type }) => {
  const [genes, setgenes] = useState([]);
  const navigate = useNavigate();
  const key = process.env.REACT_APP_TMDB_Key;

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${key}`)
      .then((res) => {
        setgenes(res.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type]);

  const handleGenesClick = (jonar) => {
    navigate(`/search/genes/${jonar.name}`, { state: { type, jonar } });
  };

  return (
    <>
      <div className="text-white m-2">
        <div className="hidden sm:flex flex-wrap justify-center">
          {genes.map((jonar, id) => (
            <div
              key={id}
              className="mt-2 mr-2 p-2 pl-3 pr-3 bg-gray-900 border rounded-md text-white hover:bg-transparent cursor-pointer hover:scale-110"
              onClick={() => handleGenesClick(jonar)}
            >
              {jonar.name}
            </div>
          ))}
        </div>
        <div className="flex sm:hidden items-center">
          <p className="mx-2">Genre:-</p>
          <select
            className="p-2 pl-3 pr-3 bg-gray-900 border rounded-md text-white hover:bg-transparent cursor-pointer hover:scale-110"
            onChange={(e) => handleGenesClick(genes[e.target.value])}
          >
            {genes.map((jonar, id) => (
              <option key={id} value={id} className="bg-gray-900">
                {jonar.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Choices;
