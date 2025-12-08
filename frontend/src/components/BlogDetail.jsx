import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = ({ user }) => {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [comment, setComment] = useState('');

    const fetchBlog = async () => {
        try {
            const response = await fetch(`/api/blog/${blogId}`);
            if (response.ok) {
                const data = await response.json();
                // Backend currently renders view with { user, blog, comments }
                // We need it to return { blog, comments }
                setBlogData(data);
            }
        } catch (error) {
            console.error("Failed to fetch blog", error);
        }
    };

    useEffect(() => {
        if (blogId) fetchBlog();
    }, [blogId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/blog/comment/${blogId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: comment }), // EJS form name="content"
            });
            if (response.ok) {
                setComment('');
                fetchBlog(); // Refresh comments
            }
        } catch (error) {
            console.error("Failed to post comment", error);
        }
    };

    if (!blogData || !blogData.blog) return <div className="container app-container">Loading...</div>;

    const { blog, comments } = blogData;

    return (
        <div className="container app-container">
            <div className="card soft p-4">
                <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                        {blog.createdBy && blog.createdBy.userProfileURL && (
                            <img src={blog.createdBy.userProfileURL} className="avatar-sm" alt="author" />
                        )}
                    </div>
                    <div>
                        <h2 className="mb-0">{blog.title}</h2>
                        <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                            by {blog.createdBy ? blog.createdBy.fullName : 'Unknown'}
                        </div>
                    </div>
                </div>

                {blog.coverImageURL && (
                    <img src={blog.coverImageURL} className="img-fluid rounded mb-3" style={{ maxHeight: '420px', objectFit: 'cover', width: '100%' }} alt="Cover" />
                )}

                <div className="blog-content">
                    <pre className="mb-0">{blog.content || blog.body}</pre>
                </div>
            </div>

            {user && (
                <div className="card soft p-3 mt-3">
                    <form onSubmit={handleCommentSubmit}>
                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Leave a comment here"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-accent">Comment</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="mt-4">
                {comments && comments.length > 0 ? (
                    <>
                        <h4 className="mb-3">Comments ({comments.length})</h4>
                        {comments.map((c, index) => (
                            <div className="comment-box d-flex mb-2" key={index}>
                                {c.createdBy && c.createdBy.userProfileURL && (
                                    <img src={c.createdBy.userProfileURL} className="avatar-sm me-3" alt="avatar" />
                                )}
                                <div>
                                    <div className="fw-bold">{c.createdBy ? c.createdBy.fullName : 'Anonymous'}</div>
                                    <div className="text-muted" style={{ fontSize: '0.95rem' }}>{c.content || c.comment}</div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="text-muted">No comments yet — be the first to comment.</div>
                )}
            </div>
        </div>
    );
};

export default BlogDetail;
