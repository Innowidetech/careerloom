import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../redux/wishlistSlice";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [wishlistItems, setWishlistItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:8000/api/v1/wishlist/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          setWishlistItems(response.data.wishlist);
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error("Please log in first.");
      return;
    }

    const jobExists = wishlistItems.some((item) => item.jobId === job._id);

    if (jobExists) {
      toast.success("Job already added to wishlist!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/v1/wishlist/add",
        {
          title: job.title,
          description: job.description,
          salary: job.salary,
          location: job.location,
          jobType: job.jobType,
          position: job.position,
          company: job.company,
          jobId: job._id,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        dispatch(
          addToWishlist({
            title: job.title,
            description: job.description,
            salary: job.salary,
            location: job.location,
            jobType: job.jobType,
            position: job.position,
            company: job.company,
            jobId: job._id,
            userId: user._id,
          })
        );
        toast.success("Job added to wishlist!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to wishlist."
      );
    }
  };

  return (
    <div className="p-4 rounded-md shadow-sm bg-white border border-gray-200 flex flex-col sm:flex-row justify-between items-center mb-4">
    <div className="flex md:items-center gap-4 flex-1 mb-4 sm:mb-0">
      <div className="flex items-center">
        <img src={job?.company?.logo} className="h-8 w-8 rounded-full" />
        <div className="ml-4">
          <h1 className="font-bold text-base truncate">{job?.title}</h1>
          <h1 className="text-base truncate">{job?.company.name}</h1>
        </div>
      </div>
    </div>
  
    <div className="flex flex-col items-start justify-between gap-3 text-sm text-gray-500 w-full sm:w-[120px] mb-4 sm:mb-0">
      <span
        className={`${
          job?.jobType === "Part Time" ? "text-red-500" : "text-green-500"
        } truncate`}
      >
        {job?.jobType.toLowerCase()}
      </span>
      <span>{job?.experience} yrs</span>
    </div>
  
    <div className="w-full sm:w-[150px] mb-4 sm:mb-0">
      <span>{job?.location}</span>
    </div>
  
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className="rounded-full p-2"
        size="icon"
        onClick={handleAddToWishlist}
      >
        <Bookmark className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => navigate(`/description/${job?._id}`)}
        className="text-sm bg-[#FF5722] text-white px-4 py-2 rounded-md"
      >
        Apply
      </Button>
    </div>
  </div>
  );
  
};

export default Job;
