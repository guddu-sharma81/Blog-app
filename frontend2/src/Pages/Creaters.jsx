import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

const Creaters = () => {
    const [creaters, setCreaters] = useState([]);
    console.log(creaters);


    useEffect(() => {
        const featchCreaters = async () => {
            try {
                const { data } = await axios.get('http://localhost:4001/api/users/admins', {
                    withCredentials: true
                });
                setCreaters(data);
            } catch (error) {
                console.log(error);
            }
        };
        featchCreaters();
    }, [])


    return (
        <div className='flex flex-wrap justify-center items-center my-20 bg-gray-100'>

            {creaters.map((creator) => (
                <div key={creator._id}
                    className='bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full m-2'
                >
                    <div className='relative'>
                        <img src={creator.photo.url} alt="" className='w-full h-32 object-cover' />

                        <div className='absolute inset-x-0 bottom-0 transform translate-y-1/2 '>
                            <img src={creator.photo.url} alt=""
                                className='h-16 w-16 rounded-full mx-auto border-4 border-gray-400'
                            />
                        </div>
                    </div>

                    <div className='px-4 py-4 mt-4'>
                        <h2 className='text-center text-xl font-semibold text-gray-800'>{creator.name}</h2>
                        <p className='text-center text-gray-600 mt-6'>{creator.email}</p>
                        <p className='text-center text-gray-600 mt-6'>{creator.phone}</p>
                        <p className='text-center text-gray-600 mt-6'>{creator.role}</p>
                    </div>

                </div>

            ))}
        </div>
    )
}

export default Creaters
