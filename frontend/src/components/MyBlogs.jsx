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
            <div className="container app-container">
                <div className="card soft p-4 text-center">
                    <h5 className="mb-2">You haven't posted any blogs yet!</h5>
                    <p className="mb-0">Click <Link to="/blog/add-new">here</Link> to add a new blog!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container app-container">
            <h2 className="mb-3">My Blogs</h2>
            <div className="blog-grid">
                {blogs.map(blog => (
                    <div className="card soft" key={blog._id}>
                        <img src={blog.coverImageURL} className="card-img-top" alt={blog.title} />
                        <div className="card-body">
                            <h5 className="card-title">{blog.title}</h5>
                            <Link to={`/blog/${blog._id}`} className="btn btn-accent mt-2 me-2">View</Link>
                            {/* Edit functionality not explicitly in EJS templates other than link, creating placeholder */}
                            {/* <Link to={`/blog/edit/${blog._id}`} className="btn btn-secondary mt-2 me-2">Edit</Link> */}
                            <button
                                onClick={() => handleDelete(blog._id)}
                                className="btn btn-danger mt-2"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBlogs;
