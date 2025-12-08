import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlog = ({ user }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('body', formData.body);
        if (file) {
            data.append('image', file);
        }

        try {
            // Note: Backend currently redirects. Need to refactor to return JSON.
            const response = await fetch('/api/blog', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                // If backend returns redirect 302, fetch follows it automatically if standard,
                // but if we change it to return JSON:
                const result = await response.json();
                // navigate(`/blog/${result._id}`); // Ideally navigate to the new blog
                navigate('/'); // OR home
            } else {
                setError('Failed to create blog');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <div className="container app-container">
            <div className="card soft form-card">
                <h3 className="mb-3">Create a new blog</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Blog Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Short, descriptive title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">Body</label>
                        <textarea
                            className="form-control"
                            id="body"
                            name="body"
                            rows="8"
                            placeholder="Write your story..."
                            value={formData.body}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input
                            className="form-control"
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-accent">Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
