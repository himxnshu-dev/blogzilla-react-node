import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs'); // We need to ensure the backend serves JSON at / or /api/
                if (response.ok) {
                    const data = await response.json();
                    // Assuming the API returns { blogs: [...] } or just [...]
                    // The current EJS logic passes { blogs: allBlogs }
                    setBlogs(data.blogs || data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="container app-container">
            <div className="d-flex justify-content-between align-items-center blog-header">
                <h2 className="mb-0">Latest Blogs</h2>
                {user && (
                    <div className="text-muted">Welcome, <strong>{user.fullName}</strong></div>
                )}
            </div>

            <div className="blog-grid">
                {blogs.map(blog => (
                    <div className="card soft" key={blog._id}>
                        <img src={blog.coverImageURL} className="card-img-top" alt={blog.title} />
                        <div className="card-body">
                            <h5 className="card-title">{blog.title}</h5>
                            <Link to={`/blog/${blog._id}`} className="btn btn-accent mt-2">View Blog</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
