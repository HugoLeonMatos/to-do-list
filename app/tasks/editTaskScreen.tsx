import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskId, setTaskId] = useState<number | null>(null);
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Pega o ID da tarefa da URL

  useEffect(() => {
    loadTask();
  }, []);

  // Carregar a tarefa para edição
  const loadTask = async () => {
    const storedTasks = await AsyncStorage.getItem('@tasks');
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      const taskToEdit = tasks.find((task: any) => task.id === Number(id));
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setTaskId(taskToEdit.id);
      }
    }
  };

  // Salvar a tarefa editada
  const handleSaveTask = async () => {
    const storedTasks = await AsyncStorage.getItem('@tasks');
    if (storedTasks && taskId !== null) {
      const tasks = JSON.parse(storedTasks);
      const updatedTasks = tasks.map((task: any) =>
        task.id === taskId ? { ...task, title, description } : task
      );
      await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
      router.back(); // Volta para a lista de tarefas
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Salvar Tarefa" onPress={handleSaveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
