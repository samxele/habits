import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../dash/Layout';

const TaskContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TaskItem = styled.li`
  background-color: ${props => props.theme.colors.surface};
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid ${props => props.theme.colors.text.secondary};
  border-radius: 4px;
`;

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        // Fetch tasks from API
        // For now, we'll use dummy data
        setTasks([
            { id: 1, name: 'Complete project proposal', completed: false },
            { id: 2, name: 'Buy groceries', completed: false },
            { id: 3, name: 'Call mom', completed: false },
        ]);
    }, []);

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), name: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <Layout>
            <TaskContainer>
                <h1>Daily Tasks</h1>
                <div>
                    <Input 
                        type="text" 
                        value={newTask} 
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Enter a new task"
                    />
                    <Button onClick={addTask}>Add Task</Button>
                </div>
                <TaskList>
                    {tasks.map(task => (
                        <TaskItem key={task.id}>
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.name}
                            </span>
                            <div>
                                <Button onClick={() => toggleTask(task.id)}>
                                    {task.completed ? 'Undo' : 'Complete'}
                                </Button>
                                <Button onClick={() => deleteTask(task.id)}>Delete</Button>
                            </div>
                        </TaskItem>
                    ))}
                </TaskList>
            </TaskContainer>
        </Layout>
    );
}

export default Tasks;