import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from './Layout';

const HabitList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const HabitItem = styled.li`
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
`;

function Dashboard() {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        // Fetch habits from API
        // For now, we'll use dummy data
        setHabits([
            { id: 1, name: 'Drink water', completed: false },
            { id: 2, name: 'Exercise', completed: false },
            { id: 3, name: 'Read a book', completed: false },
        ]);
    }, []);

    const toggleHabit = (id) => {
        setHabits(habits.map(habit => 
            habit.id === id ? { ...habit, completed: !habit.completed } : habit
        ));
    };

    return (
        <Layout>
            <h1>Your Habits</h1>
            <HabitList>
                {habits.map(habit => (
                    <HabitItem key={habit.id}>
                        <span>{habit.name}</span>
                        <Button onClick={() => toggleHabit(habit.id)}>
                            {habit.completed ? 'Undo' : 'Complete'}
                        </Button>
                    </HabitItem>
                ))}
            </HabitList>
        </Layout>
    );
}

export default Dashboard;