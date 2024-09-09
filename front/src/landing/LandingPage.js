import React from "react";
import { motion } from "framer-motion";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
  color: ${props => props.theme.colors.text.primary};
`;

const Message = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
`;

const AuthButton = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const About = styled(motion.div)`
  max-width: 600px;
  text-align: center;
  margin-bottom: 2rem;
`;

function LandingPage() {
    const navigate = useNavigate();

    const handleAuth = (type) => {
        navigate('/auth', { state: { type }});
    };

    return (
        <LandingContainer>
            <Message initial={{ opacity: 0, y: -50}} animate={{ opacity: 1, y: 0}} transition={{ duration: 0.5 }}>
                <h1>Welcome to Habit Maker!</h1>
                <h2>Build better habits, one day at a time</h2>
            </Message>
            <AuthButton initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <StyledButton onClick={() => handleAuth('login')}>Login</StyledButton>
                <StyledButton onClick={() => handleAuth('signup')}>Sign up</StyledButton>
            </AuthButton>
            <About initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: .4 }}>
                <h3>What is Habit Maker?</h3>
                <p>Habit Maker is a tool designed to help you achieve
                    your daily goals and complete your tasks. By utilizing a daily or weekly
                    to do list, you will be held accountable to achieve the things
                    you said you would do.
                </p>
            </About>
        </LandingContainer>
    );
}

export default LandingPage;