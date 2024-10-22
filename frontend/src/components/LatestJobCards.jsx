import React from "react";
import { useNavigate } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-md shadow-sm bg-white border border-gray-200 flex flex-row justify-between items-center mb-4 md:mx-10">
      <div className="flex items-center gap-4 flex-1 mb-4 md:mb-0">
        <img
          src={job?.company?.logo}
          alt="logo"
          className="h-4 w-4 md:h-8 md:w-8 rounded-full object-cover"
        />
        <div>
          <h1 className="text-sm  md:text-xl truncate">{job?.title}</h1>
          <p className="text-xs md:text-sm text-start">{job?.company?.name}</p>
        </div>
      </div>
  
      <div className=" grid gap-2 text-sm text-gray-500 w-full sm:w-[120px] mb-4 md:mb-0">
  <label
    className={`hidden md:block ${
      job?.jobType === "fulltime" ? "text-orange-500" : "text-[#00A53F]"
    } truncate`}
  >
    {job?.jobType.toLowerCase()}
  </label>
  <label className="hidden md:block">{job?.experience} yrs</label>
</div>

  
      <div className="hidden md:block w-full sm:w-[150px] mb-4 md:mb-0">
        <span>{job?.location}</span>
      </div>
  
      <div className="flex gap-2 md:gap-4 ">
        <CiBookmark size={24} className="text-gray-500" />
        <button
          className="text-sm bg-[#EE6C4D] text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Apply
        </button>
      </div>
    </div>
  );
  
};

export default LatestJobCards;
