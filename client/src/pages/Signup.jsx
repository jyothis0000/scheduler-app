import React, { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(email, password);
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/dashboard');
    } else {
      setError(res.message || 'Signup failed');
    }
  };

  return (
    <AuthForm
      title="Sign Up"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      submitLabel="Sign Up"
      alternateText="Already have an account?"
      alternateLink="Login"
      alternateHref="/login"
    />
  );
} 