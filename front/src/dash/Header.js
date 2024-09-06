import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../styling/ThemeContext';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import authService from '../auth/authService';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text.primary};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ThemeToggle = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text.primary};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  padding: 0;
  position: relative;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
`;

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <HeaderContainer>
      <Logo to="/dashboard">Habit Maker</Logo>
      <NavLinks>
      <ThemeToggle 
          onClick={toggleTheme} 
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <IconWrapper>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </IconWrapper>
        </ThemeToggle>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </LogoutButton>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;