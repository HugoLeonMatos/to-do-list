// import React, { createContext, useState, ReactNode, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type Task = {
//   id: number;
//   title: string;
//   description: string;
//   completed: boolean;
// };

// type TasksContextType = {
//   tasks: Task[];
//   addTask: (task: Task) => void;
//   toggleTaskCompletion: (taskId: number) => void;
//   deleteTask: (taskId: number) => void;
//   filter: 'Todas' | 'Completas' | 'Incompletas';
//   setFilter: (filter: 'Todas' | 'Completas' | 'Incompletas') => void;
// };

// const TasksContext = createContext<TasksContextType | undefined>(undefined);

// export const TasksProvider = ({ children }: { children: ReactNode }) => {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filter, setFilter] = useState<'Todas' | 'Completas' | 'Incompletas'>('Todas');

//   // Carregar as tarefas do AsyncStorage quando o componente for montado
//   useEffect(() => {
//     const loadTasks = async () => {
//       const storedTasks = await AsyncStorage.getItem('@tasks');
//       if (storedTasks) setTasks(JSON.parse(storedTasks));
//     };
//     loadTasks();
//   }, []);

//   // Função para alternar a conclusão da tarefa
//   const toggleTaskCompletion = async (taskId: number) => {
//     const updatedTasks = tasks.map(task =>
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//     await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
//   };

//   const deleteTask = async (taskId: number) => {
//     const updatedTasks = tasks.filter(task => task.id !== taskId);
//     setTasks(updatedTasks);
//     await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
//   };

//   const addTask = async (task: Task) => {
//     const updatedTasks = [...tasks, task];
//     setTasks(updatedTasks);
//     await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
//   };

//   return (
//     <TasksContext.Provider value={{ tasks, addTask, toggleTaskCompletion, deleteTask, filter, setFilter }}>
//       {children}
//     </TasksContext.Provider>
//   );
// };

// export const useTasks = () => {
//   const context = React.useContext(TasksContext);
//   if (!context) {
//     throw new Error('useTasks deve ser utilizado dentro de um TasksProvider.');
//   }
//   return context;
// };
