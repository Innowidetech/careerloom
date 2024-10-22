import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        if (!user) {
            setError("Please log in to view your wishlist.");
            setLoading(false);
            return;
        }

        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token
                const response = await axios.get(`http://localhost:8000/api/v1/wishlist/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token
                    },
                    withCredentials: true
                });
                setWishlist(response.data.wishlist);
            } catch (error) {
                setError("Failed to fetch wishlist.");
                console.error("Failed to fetch wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [user]); // Add user as a dependency

    const handleRemoveFromWishlist = async (itemId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token
            await axios.delete(`http://localhost:8000/api/v1/wishlist/remove/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token
                },
                withCredentials: true
            });
            setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== itemId));
            // toast.success("Item removed from wishlist.");
        } catch (error) {
            console.error("Failed to remove item from wishlist:", error);
            setError("Failed to remove item from wishlist.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className='text-red-500'>{error}</p>;

    // console.log(wishlist)

    return (
        <div>
            <h2 className="text-lg font-bold">Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>No items in your wishlist.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wishlist.map(item => (
    <div key={item._id} className='relative p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center gap-2 my-2'>
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src={item.company?.logo || 'default-logo.png'} />
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg'>{item.company?.name || 'Company Name Not Available'}</h1>
                                    <p className='text-sm text-gray-500'>{item.location}</p>
                                </div>
                            </div>

                            <div>
                                <h1 className='font-bold text-lg my-2'>{item.title}</h1>
                                <p className='text-sm text-gray-600 text-justify'>{item.description}</p>
                            </div>
                            <div className='flex items-center gap-2 mt-4'>
                                <Badge className={'text-blue-700 font-bold'} variant="ghost">{item.position} Positions</Badge>
                                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{item.jobType}</Badge>
                                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{item.salary} LPA</Badge>
                            </div>

                            <div className="flex justify-center mt-4 gap-2">
                            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${item.jobId}`)} variant="outline">Details</Button>
            </div>

                                <Button
                                    onClick={() => handleRemoveFromWishlist(item._id)}
                                    className="flex items-center justify-center bg-red-500 text-white rounded-full w-12 h-12 hover:bg-red-600"
                                >
                                    <FaTrash className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
