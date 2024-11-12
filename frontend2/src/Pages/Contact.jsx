import React from 'react'
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from "react-hot-toast";
const Contact = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {

        const userInfo = {
            access_key: "ab82b352-fe34-4d11-9632-049bb5588be5",
            name: data.username,
            email: data.email,
            message: data.message
        }
        try {
            await axios.post("https://api.web3forms.com/submit", userInfo);
            toast.success("Message sent successfully");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='bg-gray-50 max-h-screen flex items-center justify-center py-12 px-4 sm:px-6  lg:px-8'>
            <div className='max-w-4xl w-full space-y-8 bg-white p-10 rounded-lg shadow-lg'>
                <div className='text-center'>
                    <h2 className='text-3xl font-extrabold text-gray-900'>Contact Us</h2>
                </div>

                <div className='flex flex-col md:flex-row justify-between'>
                    <div className=' w-full md:w-1/2 mb-8 md:mb-0 md: pr-4'>
                        <h3 className='text-lg font-medium text-gray-700 mb-4'>Send us a meassage</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                            <div>
                                <input type="text" name='username' placeholder='Your Name'
                                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                                    {...register("username", { required: true })}
                                />
                                {errors.username && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
                            </div>

                            <div>
                                <input type="email" name='email' placeholder='Your Email'
                                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
                            </div>

                            <div>
                                <textarea type="text" name='message' placeholder='Your name'
                                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                                    {...register("message", { required: true })}
                                />

                                {errors.message && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
                            </div>

                            <div>
                                <button type='submit' className='w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-600 '>Submit</button>
                            </div>
                        </form>
                    </div>

                    <div className='w-full md:w-1/2 md:ml-4'>
                        <h3 className='text-lg font-medium text-gray-700 mb-4'>Contact Information</h3>
                        <ul className='space-y-4'>
                            <li className='flex items-center space-x-2'>
                                <FaPhone className='text-red-500' />
                                <span>8102522355</span>
                            </li>

                            <li className='flex items-center space-x-2'>
                                <MdOutlineMail className='text-red-500' />
                                <span>guddusharma@gmail.com</span>
                            </li>

                            <li className='flex items-center space-x-2'>
                                <FaMapMarkerAlt className='text-green-500' />
                                <span>Sipara, Patna 80007</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default Contact
