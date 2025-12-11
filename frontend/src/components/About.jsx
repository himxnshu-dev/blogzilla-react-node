const About = ({ user }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl font-heading mb-4 bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
                    About BlogZilla
                </h1>
                <p className="max-w-2xl mx-auto text-xl text-gray-500 dark:text-slate-400">
                    A community of writers, thinkers, and creators sharing their stories with the world.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl transform transition-transform hover:scale-105 duration-500">
                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Workspace"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                        <p className="font-bold text-lg">Designed for Creatives</p>
                        <p className="text-sm opacity-90">Focus on what matters - your words.</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                        Our Mission
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">
                        BlogZilla was built on the belief that everyone has a story worth telling. We wanted to create a platform that removes the clutter and complexity of traditional blogging types, allowing you to focus purely on expression.
                    </p>
                    <p className="text-lg text-gray-600 dark:text-slate-300 mb-8 leading-relaxed">
                        Whether you are sharing technical tutorials, personal anecdotes, or creative fiction, our modern, minimalist design ensures your content takes center stage.
                    </p>
                    <div className="flex space-x-4">
                        <div className="text-center">
                            <span className="block text-3xl font-bold text-sky-600 font-heading">10K+</span>
                            <span className="text-sm text-gray-500 dark:text-slate-400">Active Writers</span>
                        </div>
                        <div className="h-12 w-px bg-gray-200 dark:bg-slate-700"></div>
                        <div className="text-center">
                            <span className="block text-3xl font-bold text-sky-600 font-heading">50K+</span>
                            <span className="text-sm text-gray-500 dark:text-slate-400">Monthly Readers</span>
                        </div>
                        <div className="h-12 w-px bg-gray-200 dark:bg-slate-700"></div>
                        <div className="text-center">
                            <span className="block text-3xl font-bold text-sky-600 font-heading">100+</span>
                            <span className="text-sm text-gray-500 dark:text-slate-400">Countries</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-sky-50 dark:bg-slate-800 rounded-3xl p-10 md:p-16 text-center">
                {user ? (
                    <>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                            Continue your journey
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                            You are part of our growing community. Share your latest story with the world today.
                        </p>
                        <a
                            href="/blog/add-new"
                            className="inline-block px-8 py-4 bg-sky-600 text-white font-bold rounded-full text-lg shadow-lg hover:bg-sky-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Write a New Blog
                        </a>
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-heading">
                            Ready to share your voice?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of other writers who have found their home on BlogZilla. It's free, easy, and designed for you.
                        </p>
                        <a
                            href="/user/signup"
                            className="inline-block px-8 py-4 bg-sky-600 text-white font-bold rounded-full text-lg shadow-lg hover:bg-sky-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Get Started Today
                        </a>
                    </>
                )}
            </div>
        </div>
    );


};

export default About;
