import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Layout from './Layout';
import { FaPlus, FaTrash, FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CalendarContainer = styled.div`
  flex: 0 0 300px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: 10px;
  padding: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MonthYear = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const DayCell = styled.div`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${props => props.isSelected ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isSelected ? props.theme.colors.background : 
    props.isToday ? props.theme.colors.primary :
    props.isCurrentMonth ? props.theme.colors.text.primary : props.theme.colors.text.secondary};

  &:hover {
    background-color: ${props => props.isSelected ? props.theme.colors.primary : props.theme.colors.hover};
  }
`;

const TasksContainer = styled.div`
  flex: 1;
`;

const DateContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 15px;
  padding: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const CurrentDate = styled.h2`
  margin: 0;
  font-size: 1.5rem;
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
  margin-bottom: 15px;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.small};
  }
`;

const CheckCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.checked ? props.theme.colors.primary : props.theme.colors.text.secondary};
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.checked ? props.theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;

  &:after {
    content: '✓';
    color: ${props => props.theme.colors.background};
    font-size: 14px;
    opacity: ${props => props.checked ? 1 : 0};
  }
`;

const TaskText = styled.span`
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  color: ${props => props.checked ? props.theme.colors.text.secondary : props.theme.colors.text.primary};
  margin-right: 10px;
  flex-grow: 1;
  font-size: 1rem;
`;

const AddTaskButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${props => props.theme.shadows.small};

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
  padding: 8px;
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  background-color: transparent;
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
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
`;

const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 8px;
  color: ${props => props.theme.colors.text.secondary};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const TaskListWrapper = styled.div`
  max-height: ${props => props.isExpanded ? 'none' : '210px'};
  overflow: hidden;
  transition: max-height 0.3s ease-out;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
`;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSameDay = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, { withCredentials: true });
      setTasks(response.data.filter(task => isSameDay(new Date(task.date), selectedDate)));
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  }, [selectedDate, setTasks]); 

  useEffect(() => {
    fetchTasks();
  }, [selectedDate, fetchTasks]);

  const handleAddTask = () => {
    if (isToday(selectedDate)) {
      setIsAddingTask(true);
    }
  };

  const toggleTask = async (id) => {
    if (isToday(selectedDate)) {
      try {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${id}/toggle`, {}, { withCredentials: true });
        setTasks(tasks.map(task =>
          task._id === id ? { ...task, completed: response.data.completed } : task
        ));
      } catch (err) {
        console.error('Error toggling task:', err);
      }
    }
  };

  const deleteTask = async (id) => {
    if (isToday(selectedDate)) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { withCredentials: true });
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskKeyPress = async (e) => {
    if (e.key === 'Enter' && newTask.trim() && isToday(selectedDate)) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { name: newTask.trim(), date: selectedDate }, { withCredentials: true });
        setTasks([...tasks, response.data]);
        setNewTask("");
        setIsAddingTask(false);
      } catch (err) {
        console.error('Error adding task:', err);
      }   
    } else if (e.key === 'Escape') {
      setIsAddingTask(false);
      setNewTask("");
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<DayCell key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      days.push(
        <DayCell
          key={day}
          isSelected={isSameDay(date, selectedDate)}
          isToday={isToday(date)}
          isCurrentMonth={true}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </DayCell>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  const visibleTasks = isExpanded ? tasks : tasks.slice(0, 3);

  return (
    <Layout>
      <DashboardContainer>
        <CalendarContainer>
          <CalendarHeader>
            <MonthYear>
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </MonthYear>
            <div>
              <FaChevronLeft onClick={prevMonth} style={{ cursor: 'pointer', marginRight: '10px' }} />
              <FaChevronRight onClick={nextMonth} style={{ cursor: 'pointer' }} />
            </div>
          </CalendarHeader>
          <CalendarGrid>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <DayCell key={day} style={{ color: 'inherit', cursor: 'default' }}>{day}</DayCell>
            ))}
            {renderCalendar()}
          </CalendarGrid>
        </CalendarContainer>
        <TasksContainer>
          <DateContainer>
            <TaskListHeader>
              <CurrentDate>{selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</CurrentDate>
              {isToday(selectedDate) && !isAddingTask && (
                <AddTaskButton onClick={handleAddTask}><FaPlus /></AddTaskButton>
              )}
            </TaskListHeader>
            <TaskSection>
              <TaskListWrapper isExpanded={isExpanded}>
                <TaskList>
                  {visibleTasks.map((task) => (
                    <TaskItem key={task._id}>
                      <CheckCircle 
                        checked={task.completed} 
                        onClick={() => toggleTask(task._id)}
                      />
                      <TaskText checked={task.completed}>{task.name}</TaskText>
                      {isToday(selectedDate) && (
                        <IconContainer>
                          <Icon onClick={() => deleteTask(task._id)}>
                            <FaTrash size={16} />
                          </Icon>
                        </IconContainer>
                      )}
                    </TaskItem>
                  ))}
                  {isAddingTask && isToday(selectedDate) && (
                    <TaskItem>
                      <CheckCircle checked={false} />
                      <NewTaskInput
                        type="text"
                        placeholder="New task, press Enter to add"
                        value={newTask}
                        onChange={handleNewTaskChange}
                        onKeyDown={handleNewTaskKeyPress}
                        onBlur={() => {
                          setIsAddingTask(false);
                          setNewTask("");
                        }}
                        autoFocus
                      />
                    </TaskItem>
                  )}
                </TaskList>
              </TaskListWrapper>
              {tasks.length > 3 && (
                <ExpandButton onClick={toggleExpand}>
                  {isExpanded ? (
                    <>
                      <FaChevronUp style={{ marginRight: '5px' }} />
                      Show Less ({tasks.length - 3} more)
                    </>
                  ) : (
                    <>
                      <FaChevronDown style={{ marginRight: '5px' }} />
                      Show More ({tasks.length - 3} more)
                    </>
                  )}
                </ExpandButton>
              )}
            </TaskSection>
          </DateContainer>
        </TasksContainer>
      </DashboardContainer>
    </Layout>
  );
}

export default Dashboard;