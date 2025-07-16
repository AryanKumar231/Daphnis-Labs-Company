import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/dashboard');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('https://daphnis-labs-company.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            setUser(data.user);
            navigate('/dashboard');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="mb-3 w-full border px-4 py-2 rounded"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="mb-3 w-full border px-4 py-2 rounded"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-3 w-full border px-4 py-2 rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
                <p className='my-2 text-center'>If you don't have an account? <NavLink to='/login' className={'text-blue-400'}>click here</NavLink></p>
            </form>
        </div>
    );
};

export default Register;
