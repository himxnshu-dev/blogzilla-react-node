import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Signin from './components/Signin';
import Signup from './components/Signup';
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import MyBlogs from './components/MyBlogs';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const [user, setUser] = useState(null);

  // Check for current user session on mount
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
      // window.location.href = '/'; 
      // We rely on state update to clear user session. 
      // If we need to redirect, we should move handleLogout to a child component or use window.location.assign('/') but that reloads.
      // For now, let's just clear user and show toast. If checking user session is robust, it should work.
      toast.success('Logged out successfully');
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error('Failed to logout');
    }
  };

  return (
    <Router>
      <Toaster position="top-center" />
      <div className="flex flex-col min-h-screen bg-sky-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar user={user} handleLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About user={user} />} />
            <Route path="/user/signin" element={<Signin setUser={setUser} />} />
            <Route path="/user/signup" element={<Signup setUser={setUser} />} />
            <Route path="/blog/add-new" element={<AddBlog user={user} />} />
            <Route path="/blog/:blogId" element={<BlogDetail user={user} />} />
            <Route path="/blog/my-blogs/:userId" element={<MyBlogs user={user} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
