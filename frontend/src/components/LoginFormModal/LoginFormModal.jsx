import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""); // Changed from `credential` to `email`
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();

  // Effect to enable button when form is valid
  useEffect(() => {
    if (email.length >= 4 && password.length >= 6) {
      setIsDisabled(false); // Enable button if both fields are valid
    } else {
      setIsDisabled(true); // Disable button otherwise
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await dispatch(sessionActions.login({ email, password })); // Use `email` here
      closeModal();
      window.location = '/clubs'; // Redirect to the homepage after login
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const handleDemoLogin = async () => {
    try {
      await dispatch(sessionActions.login({ email: 'demoUser@test.com', password: 'password' }));
      closeModal();
      window.location = '/clubs'; // Redirect to the homepage after demo login
    } catch (err) {
      console.error('Demo login failed:', err);
    }
  };

  return (
    <>
      <h1>Log In</h1>
      {/* Display error message at the top */}
      {Object.keys(errors).length > 0 && (
        <p className="error-message">{errors.email || errors.password || 'Invalid credentials'}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email" // Changed to email for better semantic validation
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isDisabled}>
          Log In
        </button>
      </form>
      <button className="demo-user-btn" onClick={handleDemoLogin}>
        Demo User
      </button>
    </>
  );
}

export default LoginFormModal;
