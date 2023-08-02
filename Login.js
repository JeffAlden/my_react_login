import React, { useState } from 'react';

// React App with Login Component
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  
  // Fetch Call to Use the Backend Login API
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Making fetch request to:', 'http://localhost:3006/login'); 

    const response = await fetch('http://localhost:3006/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log('Fetch response:', response); 

    const data = await response.json();

    if (data.status === 'Success') {
        setLoginStatus('Login successful');
        if (data.isAdmin) {
          console.log('Logged in as admin');
        } else {
          console.log('Logged in as user');
        }
      } else {
        setLoginStatus('Login failed');
        console.log('Login failed');
      }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{loginStatus}</p>
    </div>
  );
};

export default Login;
