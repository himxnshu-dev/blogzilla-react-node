import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold font-heading text-sky-600 dark:text-sky-400">
                            BlogZilla
                        </Link>
                        <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                            Sharing stories, ideas, and experiences with the world. A platform for modern writers and readers.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Navigation</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <Link to="/" className="text-base text-gray-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-base text-gray-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog/add-new" className="text-base text-gray-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400">
                                    Write
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Subscribe</h3>
                        <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                            The latest news, articles, and resources, sent to your inbox weekly.
                        </p>
                        <form className="mt-4 sm:flex sm:max-w-md">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input type="email" name="email-address" id="email-address" autoComplete="email" required className="appearance-none min-w-0 w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-md py-2 px-4 text-base text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:placeholder-gray-400 sm:max-w-xs" placeholder="Enter your email" />
                            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                <button type="submit" className="w-full bg-sky-600 flex items-center justify-center border border-transparent rounded-md py-2 px-4 text-base font-medium text-white hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-slate-700 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; {new Date().getFullYear()} BlogZilla. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
