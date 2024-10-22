import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterData, setFilterData] = useState([
    {
      filterType: "Location",
      array: [],
    },
    {
      filterType: "Title",
      array: [],
    },
  ]);
  const [selectedValue, setSelectedValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const uniqueLocations = new Set();
    const titleCount = new Map();

    allJobs.forEach((job) => {
      if (job.location) uniqueLocations.add(job.location);
      if (job.title) {
        const titleLower = job.title.toLowerCase();
        titleCount.set(titleLower, (titleCount.get(titleLower) || 0) + 1); // Count occurrences
      }
    });

    const locationsArray = Array.from(uniqueLocations);

    // Create an array of unique titles with their counts
    const filteredTitles = Array.from(titleCount.entries())
      .filter(([title]) => title.includes(searchQuery.toLowerCase()))
      .map(([title, count]) => ({ title, count }));

    setFilterData([
      {
        filterType: "Location",
        array: locationsArray,
      },
      {
        filterType: "Role",
        array: filteredTitles, // Array of objects with title and count
      },
    ]);
  }, [allJobs, searchQuery]);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-[#E5E5E5] p-3 rounded-md">
      <h1 className="text-lg mb-4">Search job By Title</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by title..."
          className="p-2 border rounded-md w-full"
        />
      </div>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data) => (
          <div key={data.filterType}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            <div className={`max-h-60 overflow-y-auto`}>
              {data.filterType === "Location"
                ? data.array.map((location, idx) => (
                    <div
                      className="flex items-center space-x-2 my-2"
                      key={location}
                    >
                      <RadioGroupItem value={location} id={`location-${idx}`} />
                      <Label htmlFor={`location-${idx}`}>{location}</Label>
                    </div>
                  ))
                : data.array.map((item, idx) => {
                    const itemId = `role-${idx}`;
                    return (
                      <div
                        className="flex items-center space-x-2 my-2"
                        key={itemId}
                      >
                        <RadioGroupItem value={item.title} id={itemId} />
                        <Label htmlFor={itemId}>{item.title}</Label>
                      </div>
                    );
                  })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
