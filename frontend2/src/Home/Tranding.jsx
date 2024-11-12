import React from 'react'
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Tranding = () => {
    const { blog } = useAuth();
    console.log(blog);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='container mx-auto'>
            <h1 className='text-2xl font-semibold mb-4'>Trading</h1>
            <Carousel responsive={responsive}>
                {blog && blog.length > 0 ? (
                    blog.map((element) => {

                        return (
                            <div key={element._id} className='bg-white p-4 border border-gray-400 rounded-lg shadow-md mx-2 hover:shadow-lg  transform hover:scale-105 transform-transtion duration-300' >
                                <Link to={`/blog/${element._id}`} >
                                    <div className='group relative'>
                                        <img src={element.blogImage.url} alt='' className='w-full h-56 object-cover rounded-t-lg ' />


                                        <div className='absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm'>{element.category}</div>
                                    </div>

                                    <div className='p-4 bg-gray-50 rounded-b-lg h-36 flex flex-col justify-between '>

                                        <h1 className='text-lg font-bold mb-2 overflow-hidden text-ellipsis' style={{ whiteSpace: 'nowrap' }}>{element.title}</h1>
                                        <div className='flex items-center'>
                                            <img src={element.adminPhoto} alt="" className='h-10 w-10 rounded-full border-2 border-blue-400' />

                                            <p className='ml-3 text-sm text-gray-400'>{element.adminName}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                ) : (
                    <div className='flex h-screen items-center justify-center '>Loading...</div>
                )}
            </Carousel>
        </div>
    )
}

export default Tranding
