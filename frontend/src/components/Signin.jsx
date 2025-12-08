import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Assuming the backend sets a cookie or returns a token
                // If refactored to return user data:
                // const user = await response.json();
                // setUser(user);
                navigate('/');
                window.location.reload(); // Temporary force reload to refresh state from cookie
            } else {
                const data = await response.json();
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="container app-container">
            <div className="card soft form-card">
                <h3 className="mb-3">Sign in</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userEmail" className="form-label">Email address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="userEmail"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="userPassword"
                            placeholder="Your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-accent">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
