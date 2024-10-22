import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from '@/redux/jobSlice';

const TestRolesSection = () => {
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const ScrollTop = () => {
    window.scrollTo(0, 0);
  };

  const searchJobHandler = (query, path) => {
    dispatch(setSearchedQuery(query));
    navigate(path);
  };

  // Get unique roles based on job title, normalized (lowercase and trimmed)
  const uniqueRoles = Array.from(
    new Set(
      allJobs.map((job) => job.title.trim().toLowerCase())
    )
  ).map((normalizedTitle) =>
    allJobs.find((job) => job.title.trim().toLowerCase() === normalizedTitle).title
  );

  // Colors array for role background colors (pastel theme)
  const roleColors = [
    "bg-[#bdeffb]", 
    "bg-[#fff5b1]", 
    "bg-[#f8dbf1]", 
    "bg-[#cff9e3]", 
    "bg-[#e3d4f5]", 
    "bg-[#fce4d6]", 
  ];

  return (
    <>
      <div className="flex justify-center py-4">
        <label className="text-center text-xl lg:text-3xl font-semibold" style={{ fontFamily: 'Inter' }}>
          Most Demanding Categories
        </label>
      </div>
      <div className="flex flex-wrap justify-start gap-4 sm:gap-6 pt-6 pb-8 px-4 sm:px-6 lg:px-10 my-4 md:mx-6">
        {uniqueRoles.map((role, index) => (
          <div
            key={index}
            className={`flex items-center justify-center min-w-[100px] sm:min-w-[200px] h-[50px] rounded-full text-lg cursor-pointer transition-transform transform hover:scale-105 shadow-md p-3 sm:p-4 ${roleColors[index % roleColors.length]} 
            ${index % 2 === 0 ? 'md:col-span-2' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              ScrollTop();
              searchJobHandler(role, `/jobs/${role.toLowerCase().replace(/ /g, '-')}`);
            }}
          >
            <p
              className={`text-sm sm:text-base lg:text-lg ${hoveredIndex === index ? "text-[#653ea7]" : "text-gray-700"} text-center`}
              style={{ fontFamily: 'Inter' }}
            >
              {role}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TestRolesSection;
