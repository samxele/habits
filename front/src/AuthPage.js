import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import authService from './authService';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: 20px;
`;

const AuthForm = styled.form`
  background: ${props => props.theme.colors.surface};
  padding: 40px;
  border-radius: 8px;
  box-shadow: ${props => props.theme.shadows.medium};
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  margin-bottom: 15px;
  font-size: 14px;
`;

const SwitchMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  color: ${props => props.theme.colors.text.secondary};

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const authType = location.state?.type || 'login';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData({
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        });
        setErrors({});
    }, [authType]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.email) errors.email = "Email is required";
        if (!formData.password) errors.password = "Password is required";
        if (authType === 'signup') {
            if (!formData.name) errors.name = "Name is required";
            if (formData.password !== formData.confirmPassword) {
                errors.confirmPassword = "Passwords do not match";
            }
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                if (authType === 'login') {
                    await authService.login(formData.email, formData.password);
                } else {
                    await authService.register(formData.name, formData.email, formData.password);
                }
                navigate('/dashboard');
            } catch (error) {
                setErrors({ form: error.message || "An error occurred. Please try again." });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <AuthContainer>
            <AuthForm onSubmit={handleSubmit}>
                <Title>{authType === 'login' ? 'Log In' : 'Sign Up'}</Title>
                {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
                {authType === 'signup' && (
                    <div>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    </div>
                )}
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                {authType === 'signup' && (
                    <div>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
                    </div>
                )}
                <Button type="submit">{authType === 'login' ? 'Log In' : 'Sign Up'}</Button>
            </AuthForm>
            <SwitchMessage>
                {authType === 'login' ? (
                    <>Don't have an account? <Link to="/auth" state={{ type: 'signup' }}>Sign up</Link></>
                ) : (
                    <>Already have an account? <Link to="/auth" state={{ type: 'login' }}>Log In</Link></>
                )}
            </SwitchMessage>
        </AuthContainer>
    );
}

export default AuthPage;