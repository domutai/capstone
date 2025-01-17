import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const isFormIncomplete =
    !email || !firstName || !lastName || !password || !confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!email.includes("@") || !email.includes(".")) {
      validationErrors.email = "Please provide a valid email address.";
    }
    if (firstName.trim() === "") {
      validationErrors.firstName = "First name is required.";
    }
    if (lastName.trim() === "") {
      validationErrors.lastName = "Last name is required.";
    }
    if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long.";
    }
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(
        sessionActions.signup({
          email,
          firstName,
          lastName,
          password,
          role, 
        })
      );
      closeModal();
      window.location = '/clubs'; 
    } catch (res) {
      const data = await res.json();
      const backendErrors = {};

      if (data?.errors) {
        if (data.errors.email) backendErrors.email = data.errors.email;
        if (data.errors.password) backendErrors.password = data.errors.password;
        if (data.errors.role) backendErrors.role = data.errors.role;
      }

      setErrors(backendErrors);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {Object.keys(errors).length > 0 && (
        <div className="error-messages">
          {Object.values(errors).map((error, idx) => (
            <p key={idx} className="error">{error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
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
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={isFormIncomplete}
          className={isFormIncomplete ? 'disabled' : ''}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
