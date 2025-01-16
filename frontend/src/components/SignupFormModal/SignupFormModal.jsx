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
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // Check if the form is incomplete
  const isFormIncomplete =
    !email || !firstName || !lastName || !password || !confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Local validation
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

    // If local validation fails, set errors and stop
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Backend validation
    try {
      await dispatch(
        sessionActions.signup({
          email,
          firstName,
          lastName,
          password,
        })
      );
      closeModal(); // Close modal on successful signup
      window.location = '/clubs'; // Redirect to homepage
    } catch (res) {
      const data = await res.json();

      const backendErrors = {};
      if (data?.errors) {
        if (data.errors.email) {
          backendErrors.email = data.errors.email;
        }
        if (data.errors.password) {
          backendErrors.password = data.errors.password;
        }
      }

      // Set backend errors
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
