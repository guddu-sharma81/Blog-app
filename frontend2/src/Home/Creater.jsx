import axios from 'axios';
import { useEffect, useState } from 'react';

const Creater = () => {
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        const fetchAdmin = async () => {
            const { data } = await axios.get('http://localhost:4001/api/users/admins',
                {
                    withCredentials: true
                }
            );
            console.log(data)
            setAdmin(data)
        };
        fetchAdmin();
    }, [])

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-semibold mb-6'>Populer Creaters</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full my-5">
                {admin && admin.length > 0 ? (
                    admin.slice(0, 4).map((element) => {

                        return (
                            <div key={element._id}>
                                <div className="">
                                    <img
                                        src={element.photo.url}
                                        alt="blog"
                                        className="w-56 h-56 object-cover border border-black rounded-full items-center ml-16 "
                                    />
                                    <div className="text-center lg:ml-10">
                                        <p>{element.name}</p>
                                        <p className="text-gray-600 text-xs">{element.role}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div>No blogs available</div>
                )}
            </div>
        </div>
    )
}

export default Creater
