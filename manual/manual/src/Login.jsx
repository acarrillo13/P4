import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (username === 'admin' && password === 'admin') {
      navigate('/form');
    } else {
      alert('Login Failed, Try Again');
    }
  }

  return (
    <div>
        <h1>Login</h1>
        <div className="input">
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <button onClick={() => submit}>Submit</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
    </div>
  )
}

export default Login
