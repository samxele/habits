import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../styling/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

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

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
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

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Logo to="/dashboard">Habit Maker</Logo>
      <NavLinks>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/logout">Logout</NavLink>
        <ThemeToggle 
          onClick={toggleTheme} 
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <IconWrapper>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </IconWrapper>
        </ThemeToggle>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;