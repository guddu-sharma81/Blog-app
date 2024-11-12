import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <footer className='border py-10'>
                <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:ml-32'>
                    <div className='text-center md:text-start'>
                        <h2 className='text-lg font-semibold mb-4'>Products</h2>
                        <ul className='space-y-2'>
                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Flutter</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>React</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Andriod</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>ios</a>
                            </li>
                        </ul>
                    </div>

                    <div className='text-center md:text-start'>
                        <h2 className='text-lg font-semibold mb-4'>Degine to Code</h2>
                        <ul className='space-y-2'>
                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Figma plugin</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Templates</a>
                            </li>

                        </ul>
                    </div>

                    <div className='text-center md:text-start'>
                        <h2 className='text-lg font-semibold mb-4'>Comparison</h2>
                        <ul className='space-y-2'>
                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Dhiwise vs Anima</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Dhiwise vs Appsmth</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Dhiwise vs Flutterflow</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Dhiwise vs Monday Hero</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Dhiwise vs Retool</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Dhiwise vs Bubble</a>
                            </li>
                        </ul>
                    </div>

                    <div className='text-center md:text-start'>
                        <h2 className='text-lg font-semibold mb-4'>Company</h2>
                        <ul className='space-y-2'>
                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>About us</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Contact us</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Career</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Terms of service</a>
                            </li>

                            <li>
                                <a href="" className='text-gray-400 hover:text-blue-400'>Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>

            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center p-5'>
                <div className='font-semibold text-xl'>
                    Guddu<span className='text-blue-600'>Blogs</span>
                </div>
                <div className='text-gray-400 text-sm  md:flex'>
                    <p>&copy; 2024 guddu blogs All rights reserved</p>
                </div>
                <div className=' mt-4 md:mt-8 flex space-x-4'>
                    <a href="">
                        <FaGithub />
                    </a>

                    <a href="">
                        <FaYoutube />
                    </a>

                    <a href="">
                        <FaLinkedin />
                    </a>
                </div>
            </div>

        </>
    )
}

export default Footer
