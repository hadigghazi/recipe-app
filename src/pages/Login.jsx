import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost/recipe-app/api/login.php', 
        JSON.stringify({ username, password }), {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Login response:', response.data); // Log response data for debugging

      if (response.data.success) {
        setSuccess('Logged in successfully');
        setError('');
        localStorage.setItem('user_id', response.data.user_id); // Save user_id to local storage
      } else {
        setError(response.data.error);
        setSuccess('');
      }
    } catch (err) {
      setError('There was an error logging in.');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default LoginPage;
