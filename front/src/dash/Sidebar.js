import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.aside`
  width: 250px;
  background-color: ${props => props.theme.colors.surface};
  padding: 1rem;
`;

const SidebarLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  padding: 0.5rem 0;
  &:hover {
    color: ${props => props.theme.colors.text.secondary};
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const Sidebar = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <SidebarContainer>
      {/* <AddButton onClick={() => setShowAddModal(true)}>Add New Habit/Task</AddButton> */}
      <SidebarLink to="/dashboard/tasks">Daily Tasks</SidebarLink>
      <SidebarLink to="/dashboard/weekly">Daily and Weekly Habits</SidebarLink>
      <SidebarLink to="/dashboard/monthly">Monthly View</SidebarLink>
      {showAddModal && (
        // Add your modal component here
        <div>Modal for adding new habit/task</div>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;