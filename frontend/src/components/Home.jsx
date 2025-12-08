import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/blogs');
                if (response.ok) {
                    const data = await response.json();
                    setBlogs(data.blogs);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    // Featured Blog (Latest)
    const featuredBlog = blogs.length > 0 ? blogs[0] : null;
    const recentBlogs = blogs.length > 0 ? blogs.slice(1) : [];

    return (
        <div className="">
            {/* Hero Section */}
            {featuredBlog && (
                <div className="relative bg-white dark:bg-slate-800 shadow-xl overflow-hidden mb-12">
                    <div className="absolute inset-0">
                        {featuredBlog.coverImageURL ? (
                            <img className="h-full w-full object-cover opacity-30 dark:opacity-20 transition-transform duration-700 hover:scale-105" src={featuredBlog.coverImageURL} alt={featuredBlog.title} />
                        ) : (
                            <div className="h-full w-full bg-gradient-to-r from-sky-500 to-indigo-600 opacity-90"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 to-indigo-900/80 mix-blend-multiply"></div>
                    </div>
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center sm:text-left">
                        <Link to={`/blog/${featuredBlog._id}`} className="group block">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-heading group-hover:text-sky-200 transition-colors duration-300">
                                {featuredBlog.title}
                            </h1>
                            <p className="mt-6 text-xl text-sky-100 max-w-3xl line-clamp-3">
                                {featuredBlog.body}
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                                <div className="flex items-center">
                                    {featuredBlog.createdBy?.profileImageURL ? (
                                        <img className="h-10 w-10 rounded-full ring-2 ring-sky-300" src={featuredBlog.createdBy.profileImageURL} alt="" />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center font-bold ring-2 ring-sky-300">
                                            {featuredBlog.createdBy?.fullName?.[0]}
                                        </div>
                                    )}
                                    <div className="ml-3 text-base text-sky-200">
                                        <p className="font-semibold text-white">{featuredBlog.createdBy?.fullName}</p>
                                        <p>Editor's Pick</p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-indigo-700 bg-white hover:bg-sky-50 transition-all duration-300 transform group-hover:translate-x-1">
                                    Read Article &rarr;
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Blog Grid (Left 2 columns) */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 pb-4">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white font-heading">
                                Recent Stories
                            </h2>
                            <div className="flex space-x-2">
                                <button className="p-2 text-gray-400 hover:text-sky-600 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                                <button className="p-2 text-gray-400 hover:text-sky-600 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></button>
                            </div>
                        </div>

                        {recentBlogs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-500 dark:text-slate-400">No stories found. Start the converstation by writing one!</p>
                                {user && <Link to="/blog/add-new" className="mt-4 inline-block text-sky-600 hover:text-sky-500">Write a blog &rarr;</Link>}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {recentBlogs.map(blog => (
                                    <div key={blog._id} className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-slate-900/50 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700/50">
                                        <Link to={`/blog/${blog._id}`} className="block relative h-48 overflow-hidden">
                                            {blog.coverImageURL ? (
                                                <img src={blog.coverImageURL} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                                                    <span className="text-4xl text-gray-300 dark:text-slate-500">📝</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                                        </Link>
                                        <div className="p-6">
                                            <div className="flex items-center space-x-2 mb-4">
                                                {blog.createdBy?.profileImageURL ? (
                                                    <img src={blog.createdBy.profileImageURL} alt="" className="h-6 w-6 rounded-full" />
                                                ) : (
                                                    <div className="h-6 w-6 rounded-full bg-sky-100 dark:bg-sky-900 text-xs flex items-center justify-center font-bold text-sky-600">
                                                        {blog.createdBy?.fullName?.[0]}
                                                    </div>
                                                )}
                                                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{blog.createdBy?.fullName}</span>
                                            </div>
                                            <Link to={`/blog/${blog._id}`}>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-heading mb-2 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                                    {blog.title}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-3 mb-4">
                                                {blog.body}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                                    5 Min Read
                                                </span>
                                                <Link to={`/blog/${blog._id}`} className="text-sky-600 dark:text-sky-400 text-sm font-semibold hover:text-sky-500 transition-colors">
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar (Right 1 column) */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Widgets */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading mb-4 border-l-4 border-sky-500 pl-3">
                                Popular Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Technology', 'Design', 'Culture', 'Politics', 'Science', 'Health'].map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-sky-900 dark:hover:text-sky-300 transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-sky-500 rounded-2xl shadow-lg p-6 text-white text-center">
                            <h3 className="text-xl font-bold font-heading mb-2">Subscribe to Newsletter</h3>
                            <p className="text-indigo-100 text-sm mb-6">Get the latest posts delivered right to your inbox.</p>
                            <form className="space-y-3">
                                <input type="email" placeholder="Your email address" className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-white/50 focus:outline-none placeholder-gray-400" />
                                <button type="button" className="w-full py-2 bg-indigo-900 hover:bg-slate-900 text-white font-semibold rounded-lg transition-colors shadow-md">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
