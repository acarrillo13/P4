import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passCheck, setPassCheck] = useState('');

  const regCheck = async (e) => {
    e?.preventDefault?.();
    if (password !== passCheck) {
      alert("Passwords don't match");
      return;
    }
    try {
      const res = await axios.post('http://localhost:3001/register', { username, password });
      if (res.status === 201) {
        alert('Registered successfully');
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error', err);
      if (err.response && err.response.status === 409) {
        alert('Username already exists');
      } else {
        alert('Registration failed');
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={regCheck}>
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
        <div className="input">
          <input
            type="password"
            placeholder="Re-enter Password"
            value={passCheck}
            onChange={(e) => setPassCheck(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Register;