import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Layout from '../dash/Layout';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const TasksContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const DateContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const CurrentDate = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
`;

const TaskSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const TaskListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.small};
  }
`;

const CheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.checked ? props.theme.colors.primary : props.theme.colors.text.secondary};
  margin-right: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.checked ? props.theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;

  &:after {
    content: '✓';
    color: ${props => props.theme.colors.background};
    font-size: 16px;
    opacity: ${props => props.checked ? 1 : 0};
  }
`;

const TaskText = styled.span`
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  color: ${props => props.checked ? props.theme.colors.text.secondary : props.theme.colors.text.primary};
  margin-right: 10px;
  flex-grow: 1;
  font-size: 1.1rem;
`;

const AddTaskButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.medium};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const NewTaskInput = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  background-color: transparent;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
  }

  &:focus {
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${TaskItem}:hover & {
    opacity: 1;
  }
`;

const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const EditInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text.primary};
  font-size: 1.1rem;
  outline: none;
  padding: 5px;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.colors.secondary};
  }
`;

const ErrorMessage = styled.div`
  background-color: ${props => props.theme.colors.error};
  color: white;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  opacity: ${props => props.$show ? 1 : 0};
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const DateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PastDateContainer = styled(DateContainer)`
  opacity: 0.8;
`;

const PastTaskItem = styled(TaskItem)`
  ${IconContainer} {
    display: none;
  }
`;

const PastCheckCircle = styled(CheckCircle)`
  cursor: default;
`;

function PastDateTasks({ date, tasks }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <PastDateContainer>
      <CurrentDate>{formattedDate}</CurrentDate>
      <TaskSection>
        <TaskList>
          {tasks.map((task) => (
            <PastTaskItem key={task._id}>
              <PastCheckCircle checked={task.completed} />
              <TaskText checked={task.completed}>{task.name}</TaskText>
            </PastTaskItem>
          ))}
        </TaskList>
      </TaskSection>
    </PastDateContainer>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [pastTasks, setPastTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  const [showError, setShowError] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    fetchTasks();
    fetchPastTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks`, { withCredentials: true });
      setTasks(response.data.filter(task => isToday(new Date(task.date))));
    } catch (err) {
      showErrorMessage('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    }
  };

  const fetchPastTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks/past`, { withCredentials: true });
      setPastTasks(response.data);
    } catch (err) {
      showErrorMessage('Failed to fetch past tasks. Please try again.');
      console.error('Error fetching past tasks:', err);
    }
  };

  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  const toggleTask = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/tasks/${id}/toggle`, {}, { withCredentials: true });
      setTasks(tasks.map(task =>
        task._id === id ? { ...task, completed: response.data.completed } : task
      ));
    } catch (err) {
      showErrorMessage('Failed to update task. Please try again.');
      console.error('Error toggling task:', err);
    }
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskKeyPress = async (e) => {
    if (e.key === 'Enter' && newTask.trim()) {
      try {
        const response = await axios.post(`http://localhost:3000/api/tasks`, { name: newTask.trim() }, { withCredentials: true });
        setTasks([...tasks, response.data]);
        setNewTask("");
        setIsAddingTask(false);
      } catch (err) {
        showErrorMessage('Failed to add task. Please try again');
        console.error('Error adding task:', err);
      }   
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, { withCredentials: true });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      showErrorMessage('Failed to delete task. Please try again');
      console.error('Error deleting task:', err);
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskName(task.name);
  };

  const handleEditChange = (e) => {
    setEditingTaskName(e.target.value);
  };

  const handleEditSubmit = async (e) => {
    if (e.key === 'Enter' && editingTaskName.trim()) {
      try {
        const response = await axios.patch(`http://localhost:3000/api/tasks/${editingTaskId}`, 
          { name: editingTaskName.trim() }, 
          { withCredentials: true }
        );
        setTasks(tasks.map(task => 
          task._id === editingTaskId ? { ...task, name: response.data.name } : task
        ));
        setEditingTaskId(null);
        setEditingTaskName("");
      } catch (err) {
        showErrorMessage('Failed to update task. Please try again.');
        console.error('Error updating task:', err);
      }
    }
  };

  const showErrorMessage = (message) => {
    setError(message);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  return (
    <Layout>
      <ErrorMessage $show={showError}>{error}</ErrorMessage>
      <TasksContainer>
        <DateList>
          <DateContainer>
            <TaskListHeader>
              <CurrentDate>{currentDate}</CurrentDate>
              {!isAddingTask && <AddTaskButton onClick={handleAddTask}><FaPlus /></AddTaskButton>}
            </TaskListHeader>
            <TaskSection>
              <TaskList>
                {tasks.map((task) => (
                  <TaskItem key={task._id}>
                    <CheckCircle 
                      checked={task.completed} 
                      onClick={() => toggleTask(task._id)}
                    />
                    {editingTaskId === task._id ? (
                      <EditInput
                        value={editingTaskName}
                        onChange={handleEditChange}
                        onKeyDown={handleEditSubmit}
                        autoFocus
                      />
                    ) : (
                      <TaskText checked={task.completed}>{task.name}</TaskText>
                    )}
                    <IconContainer>
                      <Icon onClick={() => startEditing(task)}>
                        <FaEdit size={18} />
                      </Icon>
                      <Icon onClick={() => deleteTask(task._id)}>
                        <FaTrash size={18} />
                      </Icon>
                    </IconContainer>
                  </TaskItem>
                ))}
                {isAddingTask && (
                  <TaskItem>
                    <CheckCircle checked={false} />
                    <NewTaskInput
                      type="text"
                      placeholder="Type your new task and press Enter"
                      value={newTask}
                      onChange={handleNewTaskChange}
                      onKeyDown={handleNewTaskKeyPress}
                      autoFocus
                    />
                  </TaskItem>
                )}
              </TaskList>
            </TaskSection>
          </DateContainer>
          {Object.entries(pastTasks)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .map(([date, tasks]) => (
              <PastDateTasks key={date} date={date} tasks={tasks} />
            ))}
        </DateList>
      </TasksContainer>
    </Layout>
  );
}

export default Tasks;