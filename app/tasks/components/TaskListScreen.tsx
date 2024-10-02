import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import FilterButtons from './FilterButtons';
import TaskItem from './TaskItem';

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('Todas');
  const router = useRouter();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('@tasks');
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  const filteredTasks = () => {
    if (filter === 'Completas') {
      return tasks.filter(task => task.completed);
    } else if (filter === 'Incompletas') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  const toggleTaskCompletion = async (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = async (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTask = (taskId: number) => {
    router.push({ pathname: '/tasks/editTaskScreen', params: { id: taskId } });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Adicionar Tarefa" onPress={() => router.push('/tasks/new')} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      {filteredTasks().length === 0 ? (
        <Text>Nenhuma tarefa adicionada.</Text>
      ) : (
        <FlatList
          data={filteredTasks()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              toggleTaskCompletion={toggleTaskCompletion}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          )}
        />
      )}
    </View>
  );
}
