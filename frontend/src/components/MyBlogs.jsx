import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MyBlogs = ({ user }) => {
    const { userId } = useParams();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const response = await fetch(`/api/blog/my-blogs/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data.blogs || data);
                }
            } catch (error) {
                console.error("Failed to fetch my blogs", error);
            }
        };
        if (userId) fetchMyBlogs();
    }, [userId]);

    const handleDelete = async (blogId) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        try {
            // Backend expects POST currently. Refactor to DELETE preferred.
            const response = await fetch(`/api/blog/delete-blog/${blogId}`, {
                method: 'POST',
            });
            if (response.ok) {
                setBlogs(blogs.filter(b => b._id !== blogId));
            }
        } catch (error) {
            console.error("Failed to delete blog", error);
        }
    };

    if (!blogs.length) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new blog post.</p>
                    <div className="mt-6">
                        <Link to="/blog/add-new" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Create new blog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">My Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map(blog => (
                    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col h-full" key={blog._id}>
                        <img src={blog.coverImageURL} className="w-full h-48 object-cover" alt={blog.title} />
                        <div className="p-6 flex flex-col flex-1">
                            <h5 className="text-xl font-bold text-gray-900 mb-2 truncate">{blog.title}</h5>
                            <div className="mt-auto pt-4 flex space-x-3">
                                <Link to={`/blog/${blog._id}`} className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    View
                                </Link>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBlogs;
