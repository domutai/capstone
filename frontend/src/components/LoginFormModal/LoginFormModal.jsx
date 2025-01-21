import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (email.length >= 4 && password.length >= 6) {
      setIsDisabled(false); 
    } else {
      setIsDisabled(true); 
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await dispatch(sessionActions.login({ email, password })); 
      closeModal();
      window.location = '/clubs'; 
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
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
            type="email" 
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
    </>
  );
}

export default LoginFormModal;
