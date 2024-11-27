import React from 'react';
import { FaUser } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice'; // Adjust the import path as necessary
import axios from 'axios';
import { USER_API_END_POINT } from "@/utils/constant"; // Adjust as needed
import { toast } from "sonner";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth); // Assuming you are using Redux to manage user state

    const navLinks = [
        { name: "Frontend Developer", path: "/frontend" },
        { name: "Backend Developer", path: "/backend" },
        { name: "FullStack Developer", path: "/fullstack" },
        { name: "Graphics Designer", path: "/graphicdesigner" },
        { name: "Data Science", path: "/datascience" },
    ];

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <nav className="bg-white shadow-lg fixed top-0 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <div className='flex items-center gap-4'>
                            <h1 className='text-2xl font-bold cursor-pointer' onClick={() => navigate('/')}>
                                Job<span className='text-[#F83002]'>Portal</span>
                            </h1>
                        </div>
                        <div className="hidden md:flex space-x-6 ml-10">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => 
                                        `text-gray-700 hover:text-orange-500 ${isActive ? 'text-orange-500' : ''}`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {!user ? (
                            <button className="text-orange-600 border border-orange-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 hover:text-white" onClick={() => navigate('/login')}>
                                <FaUser />
                                <span>Login</span>
                            </button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {/* <span className="text-gray-700 font-bold">{user.fullname}</span> */}
                                <button className="text-orange-600 border border-orange-600 px-4 py-2 rounded-lg hover:bg-orange-600 hover:text-white" onClick={logoutHandler}>
                                    Logout
                                </button>
                                {/* Add more user-specific options here if needed */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;