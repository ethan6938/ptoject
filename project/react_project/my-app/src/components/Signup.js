import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to dashboard after signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <div className="extra-links">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;