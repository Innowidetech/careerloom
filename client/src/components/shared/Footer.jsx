import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaChevronDown } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { allJobs } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const normalize = str => {
    if (!str) return '';
    const trimmed = str.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const uniqueLocations = Array.from(new Set(allJobs.map(job => normalize(job.location)))).filter(Boolean);
  const uniqueDomains = Array.from(new Set(allJobs.map(job => normalize(job.title)))).filter(Boolean);
  const uniqueCategories = Array.from(new Set(allJobs.map(job => normalize(job.jobType)))).filter(Boolean);

  const handleNavigation = (type, value, jobId) => {
    const query = new URLSearchParams();
    if (type === 'location') {
      query.set('location', encodeURIComponent(value));
    } else if (type === 'domain') {
      query.set('title', encodeURIComponent(value));
    }
    query.set('jobId', jobId);
    navigate(`/browse?${query.toString()}`);
  };

  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  return (
    <footer className="bg-white text-customBlue py-4 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          {/* Social media links */}
          <div className="flex flex-col mb-6 md:w-1/4">
            <h1 className='text-customBlue text-2xl font-bold mb-4'>JOB HUNT</h1>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300 text-blue-600">
                <FaFacebook size={42} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300 text-blue-400">
                <FaTwitter size={42} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition duration-300 text-pink-500">
                <FaInstagram size={42} />
              </a>
            </div>
          </div>

          {/* Job categories */}
          <div className="flex flex-col mb-6 md:w-3/4 md:block">
            <div className="hidden  md:flex md:space-x-6">
              {[
                { title: 'Jobs by Location', data: uniqueLocations },
                { title: 'Jobs by Domain', data: uniqueDomains },
                { title: 'Jobs by Categories', data: uniqueCategories }
              ].map(({ title, data }) => (
                <div key={title} className="flex-1 mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <ul className="space-y-2">
                    {data.map(item => {
                      const job = allJobs.find(job => normalize(job.location) === item || normalize(job.title) === item);
                      return (
                        <li key={item} className="cursor-pointer hover:text-blue-500" onClick={() => handleNavigation(title.toLowerCase().split(' ').join(''), item, job?._id)}>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile dropdown view */}
            <div className="md:hidden">
              {['location', 'domain', 'category'].map(category => (
                <div key={category} className="cursor-pointer" onClick={() => toggleDropdown(category)}>
                  <h3 className="text-lg font-semibold flex justify-between items-center">
                    Jobs by {category.charAt(0).toUpperCase() + category.slice(1)} <FaChevronDown />
                  </h3>
                  {openDropdown === category && (
                    <ul className="space-y-2">
                      {(category === 'location' ? uniqueLocations : category === 'domain' ? uniqueDomains : uniqueCategories).map(item => {
                        const job = allJobs.find(job => normalize(job.location) === item || normalize(job.title) === item);
                        return (
                          <li key={item} className="cursor-pointer hover:text-blue-500" onClick={() => handleNavigation(category, item, job?._id)}>
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-2 border-customBlue" />
      <div className="text-center mt-2 text-customBlue">
        <p>&copy; XYZ. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;