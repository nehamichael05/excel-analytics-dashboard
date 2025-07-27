import React from 'react';
import Navbar from '../components/Navbar';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Chart } from 'chart.js/auto';

const ChartView = () => {
  const [uploads, setUploads] = useState([]);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Fetch user uploads for selection
    const fetchUploads = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/uploads/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setUploads(data);
    };
    fetchUploads();
  }, []);

  const handleUploadSelect = async (e) => {
    const uploadId = e.target.value;
    setSelectedUpload(uploadId);
    setXAxis('');
    setYAxis('');
    // Fetch upload data
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/uploads/data/${uploadId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok && data.length > 0) {
      setColumns(Object.keys(data[0]));
    } else {
      setColumns([]);
    }
  };

  const handleDrawChart = async () => {
    if (!selectedUpload || !xAxis || !yAxis) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/uploads/data/${selectedUpload}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok && data.length > 0) {
      const ctx = document.getElementById('chart-canvas').getContext('2d');
      if (chartInstance) chartInstance.destroy();
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(row => row[xAxis]),
          datasets: [{
            label: yAxis,
            data: data.map(row => row[yAxis]),
            backgroundColor: 'rgba(37, 99, 235, 0.7)',
          }],
        },
        options: {
          responsive: true,
        },
      });
      setChartInstance(chart);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Chart Visualization</h2>
        <div className="mb-4">
          <label className="mr-2">Select Upload:</label>
          <select onChange={handleUploadSelect} value={selectedUpload || ''} className="border p-2 rounded">
            <option value="">-- Select --</option>
            {uploads.map(upload => (
              <option key={upload._id} value={upload._id}>{upload.originalName}</option>
            ))}
          </select>
        </div>
        {columns.length > 0 && (
          <div className="mb-4 flex gap-4">
            <div>
              <label className="mr-2">X Axis:</label>
              <select onChange={e => setXAxis(e.target.value)} value={xAxis} className="border p-2 rounded">
                <option value="">-- Select --</option>
                {columns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mr-2">Y Axis:</label>
              <select onChange={e => setYAxis(e.target.value)} value={yAxis} className="border p-2 rounded">
                <option value="">-- Select --</option>
                {columns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <button onClick={handleDrawChart} className="bg-blue-600 text-white px-4 py-2 rounded">Draw Chart</button>
          </div>
        )}
        <canvas id="chart-canvas" width="600" height="400" className="bg-white border rounded shadow" />
      </div>
    </>
  );
};

export default ChartView;
