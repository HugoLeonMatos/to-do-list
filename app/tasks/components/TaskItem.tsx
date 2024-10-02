import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleTaskCompletion: (taskId: number) => Promise<void>;
  handleEditTask: (taskId: number) => void;
  handleDeleteTask: (taskId: number) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTaskCompletion, handleEditTask, handleDeleteTask }) => {
  return (
    <View style={styles.taskContainer}>
      <Text style={[{ fontSize: 18 }, task.completed ? styles.completedTask : null]}>
        {task.title}
      </Text>
      <Text style={{ fontSize: 16 }}>
        {task.description}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title={task.completed ? 'Reabrir' : 'Concluir'}
          onPress={() => toggleTaskCompletion(task.id)}
        />
        <Button
          title="Editar"
          onPress={() => handleEditTask(task.id)}
        />
        <Button
          title="Excluir"
          onPress={() => handleDeleteTask(task.id)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskItem;
