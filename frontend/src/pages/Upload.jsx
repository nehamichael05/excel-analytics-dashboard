import React from 'react';
import Navbar from '../components/Navbar';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');
    setLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/upload/excel', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('File uploaded and parsed successfully!');
      } else {
        setMessage(data.message || 'Upload failed');
      }
    } catch (err) {
      setMessage('Upload failed');
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} className="block mb-2" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>Upload</button>
        </form>
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </>
  );
};

export default Upload;
