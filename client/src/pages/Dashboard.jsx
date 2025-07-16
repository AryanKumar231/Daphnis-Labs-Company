import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, setUser }) => {
    const [urls, setUrls] = useState([]);
    const [originalUrl, setOriginalUrl] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        fetch('https://daphnis-labs-company.onrender.com/user-url', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then(setUrls)
            .catch(() => alert('Failed to fetch URLs'));
    }, []);

    const handleShorten = async (e) => {
        e.preventDefault();

        const res = await fetch('https://daphnis-labs-company.onrender.com/generate-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ originalUrl }),
        });

        if (res.ok) {
            setOriginalUrl('');
            const updated = await fetch('https://daphnis-labs-company.onrender.com/user-url', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUrls(await updated.json());
        } else {
            const err = await res.json();
            alert(err.message || 'Something went wrong');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Hi {user?.username || 'User'}</h1>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </div>

            <form onSubmit={handleShorten} className="flex gap-2 mb-6">
                <input
                    type="url"
                    required
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Paste your URL here..."
                    className="w-full border px-4 py-2 rounded"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded">Shorten</button>
            </form>


            <div className='overflow-x-scroll'>

                <table className="w-full bg-white border rounded shadow text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Original URL</th>
                            <th className="p-2 border">Short URL</th>
                            <th className="p-2 border">Clicks</th>
                            <th className="p-2 border">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls.map((url) => (
                            <tr key={url._id}>
                                <td className="p-2 border truncate">{url.originalUrl}</td>
                                <td className="p-2 border text-blue-600">
                                    <a href={`https://daphnis-labs-company.onrender.com/${url.shortCode}`} target="_blank" rel="noreferrer">
                                        https://daphnis-labs-company.onrender.com/{url.shortCode}
                                    </a>
                                </td>
                                <td className="p-2 border text-center">{url.clicks}</td>
                                <td className="p-2 border">{new Date(url.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
