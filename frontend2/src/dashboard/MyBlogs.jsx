import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const MyBlogs = () => {
    const [myBlogs, setMyBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const factchBlogs = async () => {
            try {
                const { data } = await axios.get("http://localhost:4001/api/blogs/my-blogs", { withCredentials: true });

                console.log(data);
                setMyBlogs(data);


            } catch (error) {
                console.log(error);

            }
        }
        factchBlogs();
    }, [])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:4001/api/blogs/delete/${id}`, {
            withCredentials: true,
        })
            .then((res) => {
                toast.success(res.data.message || "Blog deleted successfully")
                navigate('/')
                setMyBlogs((value) => value.filter((blog) => blog._id !== id));
            }).catch((err) => {
                toast.error(err.response.message || "Failed to delete blog")
            })

    }


    return (
        <div className='container max-w-5xl mx-auto my-12 p-4'>
            <div div className='grid  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:ml-20 ' >
                {myBlogs && myBlogs.length > 0 ? (
                    myBlogs.map((element) => {

                        return (

                            <Link to={`/blog/${element._id}`} key={element._id} className='bg-white rounded-lg shadow-lg overflow-hidden '>

                                {element.blogImage && (
                                    <img src={element.blogImage.url} alt='blogImage' className='w-full h-48 object-cover' />
                                )}

                                <div className='p-4 '>
                                    <span className='text-sm text-gray-400'>
                                        {element.category}
                                    </span>
                                    <h4 className='text-xl font-semibold my-2'>{element.title}</h4>

                                    <div className='flex justify-between mt-4'>
                                        <Link to={`/blog/update/${element._id}`} className='text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline'>
                                            UPDATE
                                        </Link>

                                        <button onClick={() => handleDelete(element._id)} className='text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline'>
                                            DELETE
                                        </button>
                                    </div>

                                </div>

                            </Link>
                        )
                    })
                ) : (
                    <div>No blogs available</div>
                )
                }
            </div >
        </div>
    )

}

export default MyBlogs
