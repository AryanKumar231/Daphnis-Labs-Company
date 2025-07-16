import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUser = async () => {
            if (token) {
                const res = await fetch('https://daphnis-labs-company.onrender.com/api/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    localStorage.removeItem('token');
                }
            }
        };
        fetchUser();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/register" element={<Register setUser={setUser} />} />
                <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
