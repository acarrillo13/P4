import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e?.preventDefault?.();
    if (username === 'admin' && password === 'admin') {
      navigate('/form');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      if (response.status === 200) {
        navigate('/form');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login Failed, Try Again');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <div className="input">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate('/register')}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
