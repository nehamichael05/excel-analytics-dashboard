import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, lastUpload: '' });
  const [recent, setRecent] = useState([]);
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const statsRes = await fetch('/api/uploads/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const recentRes = await fetch('/api/uploads/recent', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const trendRes = await fetch('/api/uploads/trend', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const statsData = await statsRes.json();
        const recentData = await recentRes.json();
        const trendData = await trendRes.json();
        if (statsRes.ok && recentRes.ok && trendRes.ok) {
          setStats(statsData);
          setRecent(recentData);
          setTrend(trendData);
        } else {
          setError('Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Failed to fetch dashboard data');
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-xl mx-auto space-y-6">
        {/* User Profile Card */}
        <div className="flex items-center bg-white dark:bg-gray-800 rounded p-4">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-3" />
          <div>
            <h2 className="text-lg font-bold">John Doe</h2>
            <p className="text-gray-500 text-sm">Admin</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold">Excel Analytics Dashboard</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            {/* Upload Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded p-4 flex flex-col items-center">
              <h2 className="text-base font-semibold mb-1">Upload Statistics</h2>
              <p className="text-2xl font-bold text-blue-600 mb-1">{stats.total}</p>
              <p className="text-gray-500 text-sm">Total Uploads</p>
              <p className="mt-1 text-xs text-gray-400">Last upload: {stats.lastUpload || 'N/A'}</p>
            </div>
            {/* Recent Uploads */}
            <div className="bg-white dark:bg-gray-800 rounded p-4">
              <h2 className="text-base font-semibold mb-1">Recent Uploads</h2>
              <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                {recent.length === 0 ? (
                  <li>No recent uploads</li>
                ) : (
                  recent.map((file, idx) => <li key={idx}>{file}</li>)
                )}
              </ul>
            </div>
          </>
        )}
        {/* Upload Trends Chart */}
        <div className="bg-white dark:bg-gray-800 rounded p-4">
          <h2 className="text-base font-semibold mb-1">Upload Trends</h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading chart...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <Bar
              data={{
                labels: trend.map(item => item.month),
                datasets: [
                  {
                    label: 'Uploads',
                    data: trend.map(item => item.count),
                    backgroundColor: 'rgba(99, 102, 241, 0.7)',
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { display: false }, beginAtZero: true },
                },
              }}
              height={150}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
