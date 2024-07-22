import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost/recipe-app/api/register.php', {
        username,
        password
      });

      if (response.data.success) {
        setSuccess('User registered successfully');
        setError(''); 
      } else {
        setError(response.data.error);
        setSuccess(''); 
      }
    } catch (err) {
      setError('There was an error registering.');
      setSuccess(''); 
    }
  };

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
        {error && <p className='error'>{error}</p>}
        {success && <p className='success'>{success}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
