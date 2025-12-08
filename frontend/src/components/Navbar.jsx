import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg nav-minimal">
            <div className="container app-container">
                <Link className="navbar-brand" to="/">BlogZilla</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item me-2">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item me-2">
                                    <Link className="nav-link" to="/blog/add-new">Add Blog</Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.userProfileURL && (
                                            <img src={user.userProfileURL} alt="avatar" className="avatar-xs me-2" />
                                        )}
                                        <span>{user.fullName}</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item" to={`/blog/my-blogs/${user._id}`}>My Blogs</Link></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link className="nav-link" to="/user/signin">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link btn btn-sm btn-accent text-white" to="/user/signup">Sign up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
