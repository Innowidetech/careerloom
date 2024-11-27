import React from 'react'
import ENH from '../../assets/enh.png';
import HSBC from '../../assets/hsbc.png';
import MI from '../../assets/mi.png';
import LG from '../../assets/lg.png';
import Netcracker from '../../assets/netcracker.jpg';
import Virtussa from '../../assets/virtussa.png';
import Wipro from '../../assets/wipro.png';
import TATA from '../../assets/tata.png';
import Web from '../../assets/web.png';
import { Link } from "react-router-dom";

//companies to be displayed on right side 

const companies = [
    { src: ENH, alt: "ENH", link: "https://www.enhisecure.com/is-contact.html#careers" },
    { src: HSBC, alt: "HSBC", link: "https://www.hsbc.com/careers" },
    { src: MI, alt: "MI", link: "https://www.mi.com/global/careers/" },
    { src: LG, alt: "LG", link: "https://www.lg.com/in/about-lg/careers/?srsltid=AfmBOooelVCKu3yJHkZHdBj7tBpFGW4g3xZOgy9y1YUHdCvhP-es0Csh" },
    { src: Netcracker, alt: "Netcracker", link: "https://www.netcracker.com/careers/" },
    { src: Virtussa, alt: "Virtussa", link: "https://www.virtusa.com/careers" },
    { src: Wipro, alt: "Wipro", link: "https://careers.wipro.com/careers-home/jobs/categories" },
    { src: TATA, alt: "TATA", link: "https://www.tcs.com/careers" },
    { src: Web, alt: "Web", link: "https://webappclouds.com/job-opening" },
  ];
  

function RightsideComp() {
  return (
    <>
    {/* Sidebar or additional content - Adjusted to be horizontal */}
    <div className="hidden md:block border-2 p-4 rounded-md w-1/4 lg:mt-10 h-80">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {companies.map(({ src, alt, link }) => (
        <Link to={link} key={alt} className="group">
          <div className="border rounded-lg overflow-hidden relative h-16">
            <img src={src} alt={alt} className="w-full h-auto object-cover p-2" />
            <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {alt}
            </span>
          </div>
        </Link>
      ))}
    </div>
          </div>
    </>
  )
}

export default RightsideComp