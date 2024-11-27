import React, { useState, useEffect } from "react";
import Header from "./Header";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle, AiOutlineHeart } from "react-icons/ai";
import SDE1 from "../../assets/sde.jpg";
import SDE2 from "../../assets/sde2.jpg";
import SDE3 from "../../assets/sde3.jpg";
import RightsideComp from "./RightsideComp";
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from 'sonner';

function BackendJobs() {
  const { allJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState("");
  const [filters, setFilters] = useState({ exp: "", location: "" });
  const [message, setMessage] = useState("");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const token = localStorage.getItem('token'); // Get the token from local storage
          const response = await axios.get(`https://job-portal-n9vj.onrender.com/api/v1/wishlist/${user._id}`, {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the headers
            },
            withCredentials: true,
          });
          setWishlist(response.data.wishlist || []);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        }
      }
    };
    fetchWishlist();
  }, [user]);

  const handleApplyFilters = (exp, location) => {
    setFilters({ exp, location });
  };

  const handleAddToWishlist = async (job) => {
    if (!user) {
      setMessage("Please login first.");
      toast.error("Please login first.");
      return;
    }

    const isJobInWishlist = wishlist.some((item) => item.jobId === job._id);
    if (isJobInWishlist) {
      toast.success("Job is already in your wishlist.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://job-portal-n9vj.onrender.com/api/v1/wishlist/add', {
        title: job.title,
        description: job.description,
        salary: job.salary,
        location: job.location,
        jobType: job.jobType,
        position: job.position,
        company: job.company,
        jobId: job._id,
        userId: user._id,
      }, { headers: {
        'Authorization': `Bearer ${token}`, // Include the token in headers
        'Content-Type': 'application/json' // Add the content type if needed
    },
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("Job added to wishlist!");
        setWishlist((prev) => [...prev, { jobId: job._id, ...job }]);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add to wishlist.");
      toast.error(error.response?.data?.message || "Failed to add to wishlist.");
    }
  };

  const filteredJobs = allJobs.filter((job) => {
    const jobTitle = job.title.toLowerCase();
    const matchesLocation = filters.location === "" || job.location === filters.location;
    const matchesExp = filters.exp === "" || job.experience.toString() === filters.exp;
    const skillsToCheck = [
      "backend",
      "java",
      "python",
      ".net"
    ];
    const includesSkill = skillsToCheck.some(skill => jobTitle.includes(skill));
    return includesSkill && matchesLocation && matchesExp;
  });

  const skills = [
    "Backend Developer",
    "Java Developer",
    "Python Engineer",
    ".Net Developer",
  ];

  return (
    <>
      <Header />
      <div className="md:mx-10 min-h-screen">
        <div className="flex overflow-x-auto md:overflow-hidden mb-8 md:mt-16">
          <img src={SDE1} alt="Dummy Image 1" className="hidden md:block w-full md:w-auto md:h-80 object-cover flex-shrink-0" />
          <img src={SDE2} alt="Dummy Image 2" className="w-full md:w-auto md:h-80 object-cover flex-shrink-0" />
          <img src={SDE3} alt="Dummy Image 3" className="hidden md:block w-full md:w-auto md:h-80 object-cover flex-shrink-0" />
        </div>
        <Filter onApplyFilters={handleApplyFilters} />

        <div className="flex gap-4 mt-8">
          <div className="p-2 bg-gray-50 md:mt-10 w-full md:w-3/4 flex flex-col gap-4">
            <div className="mb-4">
              <h1 className="text-2xl">Backend Developer Jobs</h1>
              <p className="text-sm text-gray-500 mt-2 mb-4">Popular Designations/Skills</p>
              <div className="flex gap-2 flex-wrap mt-2">
                {skills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    className={`px-3 py-1 border rounded-full text-sm hover:bg-orange-100 transition ${selectedSkill === skill ? 'border-blue-500 text-blue-500' : 'border-orange-300 text-orange-500'}`}
                  >
                    {skill}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedSkill("")}
                  className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition text-gray-500"
                >
                  Clear Filter
                </button>
              </div>
            </div>

            {/* Job Cards */}
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job._id} className="bg-white shadow-md rounded-md p-4 flex flex-col md:flex-row gap-4 items-center">
                  <div className="bg-orange-200 rounded-full p-2">
                    <img src={job.company.logo} alt="Company Logo" className="w-8 h-8" />
                  </div>

                  {/* Job details */}
                  <div className="flex-1">
                    <h2 className="text-lg">
                      <span className="font-medium"> {job.title} </span> - {job.description}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">{job.location}</p>
                  </div>

                  {/* Icons on the right */}
                  <div className="flex gap-4 text-gray-400">
                    <AiOutlineInfoCircle
                      className="hover:text-blue-500 cursor-pointer text-2xl"
                      title="Info"
                      onClick={() => navigate(`/description/${job?._id}`)}
                    />
                    <AiOutlineHeart
                      className="hover:text-blue-500 cursor-pointer text-2xl"
                      title="Save"
                      onClick={() => handleAddToWishlist(job)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No jobs available for {selectedSkill} positions.</p>
            )}
          </div>

          {/* Sidebar or additional content */}
          <RightsideComp />
        </div>

        {message && (
          <p className={`text-sm ${message === "Please login first." ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </>
  );
}

export default BackendJobs;
