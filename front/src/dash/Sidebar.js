import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 200px;
  background-color: ${props => props.theme.colors.surface};
  padding: 1rem;
  border-right: 1px solid ${props => props.theme.colors.background};
`;

const SidebarLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }

  ${props => props.active && `
    background-color: ${props.theme.colors.secondary};
    color: ${props.theme.colors.background};
    font-weight: 600;

    &:hover {
      background-color: ${props.theme.colors.secondary};
    }
  `}
`;

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <SidebarLink to="/dashboard" active={location.pathname === '/dashboard'}>
        Dashboard
      </SidebarLink>
      <SidebarLink to="/dashboard/tasks" active={location.pathname === '/dashboard/tasks'}>
        Daily Tasks
      </SidebarLink>
      <SidebarLink to="/dashboard/weekly" active={location.pathname === '/dashboard/weekly'}>
        Habit Tracker
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;