import React from 'react';


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError } from '../redux/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        dispatch(setError(data.message));
      }
    } catch (err) {
      dispatch(setError('Registration failed'));
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded" disabled={loading}>Register</button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && <p className="text-green-600 mt-2 text-center">Registration successful! You can now log in.</p>}
      </div>
    </div>
  );
};

export default Register;
