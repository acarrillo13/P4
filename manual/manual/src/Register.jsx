import { useState } from 'react'
import Login from './Login.jsx'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passCheck, setPassCheck] = useState('');
    const regCheck = () => {
        if (password === passCheck) {
            navigate('/login');
        } else {
            alert("Passwords Don't Match Try Again");
        }
    }
  return (
    <div>
        <h1>Register</h1>
        <div className="input">
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <input type="password" placeholder="Password" />
        </div>
        <div className="input">
          <input type="password" placeholder="Re-enter Password" />
        </div>
        <div>
          <button onClick={() => navigate('/login')}>Submit</button>

        </div>
    </div>
  );
}

export default Register