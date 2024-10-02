import React from 'react';
import TaskListScreen from './tasks/components/TaskListScreen';
// import { TasksProvider } from './TaskContext';

export default function Index() {
  return (
    // <TasksProvider>
      <TaskListScreen />
    // </TasksProvider>
  );
}
