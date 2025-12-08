import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import MyBlogs from './components/MyBlogs';

function App() {
  const [user, setUser] = useState(null);

  // TODO: Check for current user session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch('/api/user/check-user');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to check user session:", error);
        setUser(null);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/user/logout');
      setUser(null);
      // Redirect to home if not already there, or just let state update handle UI
      window.location.href = '/';
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/user/signin" element={<Signin setUser={setUser} />} />
        <Route path="/user/signup" element={<Signup setUser={setUser} />} />
        <Route path="/blog/add-new" element={<AddBlog user={user} />} />
        <Route path="/blog/:blogId" element={<BlogDetail user={user} />} />
        <Route path="/blog/my-blogs/:userId" element={<MyBlogs user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
