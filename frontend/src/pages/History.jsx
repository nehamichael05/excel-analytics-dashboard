import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const History = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/uploads/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setUploads(data);
        } else {
          setError(data.message || 'Failed to fetch history');
        }
      } catch (err) {
        setError('Failed to fetch history');
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Upload & Analysis History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Filename</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map(upload => (
                <tr key={upload._id}>
                  <td className="py-2 px-4 border">{upload.originalName}</td>
                  <td className="py-2 px-4 border">{new Date(upload.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-4 border">
                    {/* Add view/download actions here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default History;
