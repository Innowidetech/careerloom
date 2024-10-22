import React,{useState} from 'react';

const Filter = ({ onApplyFilters }) => {
  const [selectedExp, setSelectedExp] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleApply = () => {
    onApplyFilters(selectedExp, selectedLocation);
  };


  return (
    <>
    <div className="flex gap-6 md:mt-6 md:mx-4 justify-evenly md:justify-start">
        <h1 className='text-orange-600 text-lg cursor-pointer'>Jobs</h1>
        <h1 className='cursor-pointer text-lg' onClick={(e)=> navigate('#')}>Companies</h1>
        <h1 className='cursor-pointer text-lg' onClick={(e)=> navigate('#')}>Courses</h1>
      </div>
    <div className="bg-slate-100 mt-6 p-4 rounded-lg">
      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
      <label className="block text-md font-medium text-gray-700 mb-1">Filter By:</label>
        <div className="w-full sm:w-auto">
        <select
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
            >
            <option value="">Any Exp. Level</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
        </div>
        <div className="w-full sm:w-auto">
          <select
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
            <option value="">Any Location</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <button
            className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700"
            onClick={handleApply}
          > 
           Apply
        </button>
      </div>
          </div>
    </>
  );
};

export default Filter;