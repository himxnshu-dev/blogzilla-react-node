import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const BlogDetail = ({ user }) => {
    const { blogId } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [comment, setComment] = useState('');

    const fetchBlog = async () => {
        try {
            const response = await fetch(`/api/blog/${blogId}`);
            if (response.ok) {
                const data = await response.json();
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
                body: JSON.stringify({ content: comment }),
            });
            if (response.ok) {
                toast.success('Comment added successfully');
                setComment('');
                fetchBlog();
            }
        } catch (error) {
            console.error("Failed to post comment", error);
            toast.error('Failed to post comment');
        }
    };

    if (!blogData || !blogData.blog) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
    );

    const { blog, comments } = blogData;

    return (
        <div className="">
            {/* Hero Cover */}
            <div className="relative h-96 w-full overflow-hidden">
                {blog.coverImageURL ? (
                    <img src={blog.coverImageURL} className="w-full h-full object-cover" alt={blog.title} />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-sky-500 to-indigo-600"></div>
                )}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading mb-4 drop-shadow-lg">
                            {blog.title}
                        </h1>
                        <div className="flex items-center space-x-4">
                            {blog.createdBy?.profileImageURL ? (
                                <img src={blog.createdBy.profileImageURL} className="h-10 w-10 rounded-full border-2 border-white" alt="author" />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold border-2 border-white">
                                    {(blog.createdBy ? blog.createdBy.fullName : 'U')[0]}
                                </div>
                            )}
                            <div className="text-white">
                                <p className="font-semibold text-sm sm:text-base">{blog.createdBy?.fullName || 'Unknown'}</p>
                                <p className="text-xs sm:text-sm text-sky-100 opacity-90">Published on {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
                <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700">
                    <div className="px-6 py-8 sm:px-10">
                        {/* Blog Content */}
                        <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none font-sans leading-relaxed text-slate-600 dark:text-slate-300">
                            {(blog.content || blog.body || '').split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-gray-50 dark:bg-slate-900/50 px-6 py-8 sm:px-10 border-t border-gray-100 dark:border-slate-700">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-heading mb-8">
                            Discussion ({comments ? comments.length : 0})
                        </h3>

                        {user ? (
                            <form onSubmit={handleCommentSubmit} className="mb-10">
                                <div className="relative">
                                    <textarea
                                        rows="3"
                                        className="w-full rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-800 focus:ring-sky-500 focus:border-sky-500 shadow-sm p-4 text-slate-900 dark:text-white placeholder-slate-400"
                                        placeholder="What are your thoughts?"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    ></textarea>
                                    <button type="submit" className="absolute bottom-3 right-3 inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
                                        Post Comment
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-lg p-4 mb-8 text-center">
                                <p className="text-sky-800 dark:text-sky-200">
                                    Please <a href="/user/signin" className="font-bold underline hover:text-sky-600">sign in</a> to join the conversation.
                                </p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {comments && comments.length > 0 ? (
                                comments.map((c, index) => (
                                    <div className="flex space-x-4 animate-fade-in" key={index}>
                                        <div className="flex-shrink-0">
                                            {c.createdBy && c.createdBy.userProfileURL ? (
                                                <img src={c.createdBy.userProfileURL} className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-700" alt="avatar" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold">
                                                    {(c.createdBy ? c.createdBy.fullName : 'A')[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-lg rounded-tl-none shadow-sm border border-gray-100 dark:border-slate-700">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{c.createdBy ? c.createdBy.fullName : 'Anonymous'}</h4>
                                                <span className="text-xs text-slate-400">Just now</span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{c.content || c.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-4">💬</div>
                                    <p className="text-slate-500 dark:text-slate-400">No comments yet. Be the first to share your thoughts!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
