import { useState } from 'react'
import Login from './Login.jsx'
import { useNavigate } from 'react-router-dom'

function Register() {
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
          <button>Submit</button>
        </div>
    </div>
  );
}

export default Register