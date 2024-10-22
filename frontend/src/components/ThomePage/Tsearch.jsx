import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import axios from "axios";

export function TestSearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [experience, setExperience] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const searchjob = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    }
  };

  const fetchJobs = async () => {
    const response = await axios.get('http://localhost:8000/api/v1/job/get');

    if (response.data.jobs && response.data.jobs.length > 0) {
      const experiences = response.data.jobs.map(job => job.experience);
      const locations = [...new Set(response.data.jobs.map(job => job.location))]; // Unique locations
      setLocations(locations);
      setExperience(experiences);
    } else {
      setExperience([]);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex justify-center items-center p-6 ">
      <div className="flex items-center bg-[#4A4E69] shadow-md rounded-full px-4 py-2 w-full max-w-xl mt-4 md:mt-0">
        <input
          type="text"
          className="flex-grow text-white bg-[#4A4E69] outline-none md:px-4 md:py-2 rounded-l-full md:w-[20px] w-[150px]"
          placeholder="Find Your Dream Job"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={searchjob}
        />
        <hr className="border text-white h-6 ml-2 mr-2 hidden md:block"/>
        <select
          className="bg-[#4A4E69] text-white rounded-full hidden md:block"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        <hr className="border text-white h-6 ml-2 mr-2 hidden md:block"/>
         <select
          className="bg-[#4A4E69] text-white rounded-full hidden md:block"
          value={selectedExperience}
          onChange={(e) => setSelectedExperience(e.target.value)}
        >
          <option value="">Experience</option>
          {experience.map((exp, index) => (
            <option key={index} value={exp}>
              {exp} years
            </option>
          ))}
        </select>
        <button
          className="bg-white text-[#4A4E69] font-semibold py-2 px-6 rounded-full md:ml-4"
          style={{ fontFamily: 'Inter' }}
          onClick={searchJobHandler}
        >
          Search
        </button>
        </div>
    </div>
  );
}
