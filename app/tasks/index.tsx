// import React, { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
// import { useRouter } from "expo-router";

// export default function TaskListScreen() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [filter, setFilter] = useState('Todas'); // Estado para controlar o filtro
//   const router = useRouter();

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   // Carregar tarefas do AsyncStorage
//   const loadTasks = async () => {
//     const storedTasks = await AsyncStorage.getItem('@tasks');
//     if (storedTasks) setTasks(JSON.parse(storedTasks));
//   };

//   // Filtrar tarefas com base no filtro selecionado
//   const filteredTasks = () => {
//     if (filter === 'Completas') {
//       return tasks.filter(task => task.completed);
//     } else if (filter === 'Incompletas') {
//       return tasks.filter(task => !task.completed);
//     }
//     return tasks; // Retornar todas as tarefas se o filtro for "Todas"
//   };

//   // Função para alternar o status de conclusão da tarefa
//   const toggleTaskCompletion = async (taskId: number) => {
//     const updatedTasks = tasks.map(task =>
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//     await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
//   };

//   const handleDeleteTask = async (taskId: number) => {
//     const updatedTasks = tasks.filter(task => task.id !== taskId);
//     setTasks(updatedTasks);
//     await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
//   };

//   const handleEditTask = (taskId: number) => {
//     router.push({ pathname: '/tasks/editTaskScreen', params: { id: taskId } });
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Button title="Adicionar Tarefa" onPress={() => router.push('/tasks/new')} />

//       {/* Botões de Filtro */}
//       <View style={styles.filterContainer}>
//         <Button title="Todas" onPress={() => setFilter('Todas')} />
//         <Button title="Completas" onPress={() => setFilter('Completas')} />
//         <Button title="Incompletas" onPress={() => setFilter('Incompletas')} />
//       </View>

//       {filteredTasks().length === 0 ? (
//         <Text>Nenhuma tarefa adicionada.</Text>
//       ) : (
//         <FlatList
//           data={filteredTasks()} // Usando a função filtrada
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.taskContainer}>
//               <Text style={[{ fontSize: 18 }, item.completed ? styles.completedTask : null]}>
//                 {item.title}
//               </Text>
//               <Text style={{ fontSize: 16 }}>
//                 {item.description}
//               </Text>
//               <View style={styles.buttonContainer}>
//                 <Button
//                   title={item.completed ? 'Reabrir' : 'Concluir'}
//                   onPress={() => toggleTaskCompletion(item.id)}
//                 />
//                 <Button
//                   title="Editar"
//                   onPress={() => handleEditTask(item.id)}
//                 />
//                 <Button
//                   title="Excluir"
//                   onPress={() => handleDeleteTask(item.id)}
//                 />
//               </View>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   filterContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10, // Espaço entre os botões de filtro e a lista
//   },
//   taskContainer: {
//     flexDirection: 'column',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
//   completedTask: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//   },
// });
//========================
// import React from 'react';
// import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
// import { useRouter } from "expo-router";
// import { useTasks } from '../TaskContext';   // Importando o contexto

// export default function TaskListScreen() {
//   const { tasks, toggleTaskCompletion, deleteTask, filter, setFilter } = useTasks();  // Acessando o contexto
//   const router = useRouter();

//   // Função para filtrar tarefas com base no filtro selecionado
//   const filteredTasks = () => {
//     if (filter === 'Completas') {
//       return tasks.filter(task => task.completed);
//     } else if (filter === 'Incompletas') {
//       return tasks.filter(task => !task.completed);
//     }
//     return tasks; // Retornar todas as tarefas se o filtro for "Todas"
//   };

//   const handleEditTask = (taskId: number) => {
//     router.push({ pathname: '/tasks/editTaskScreen', params: { id: taskId } });
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Button title="Adicionar Tarefa" onPress={() => router.push('/tasks/new')} />

//       {/* Botões de Filtro */}
//       <View style={styles.filterContainer}>
//         <Button title="Todas" onPress={() => setFilter('Todas')} />
//         <Button title="Completas" onPress={() => setFilter('Completas')} />
//         <Button title="Incompletas" onPress={() => setFilter('Incompletas')} />
//       </View>

//       {filteredTasks().length === 0 ? (
//         <Text>Nenhuma tarefa adicionada.</Text>
//       ) : (
//         <FlatList
//           data={filteredTasks()} // Usando a função filtrada
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.taskContainer}>
//               <Text style={[{ fontSize: 18 }, item.completed ? styles.completedTask : null]}>
//                 {item.title}
//               </Text>
//               <Text style={{ fontSize: 16 }}>
//                 {item.description}
//               </Text>
//               <View style={styles.buttonContainer}>
//                 <Button
//                   title={item.completed ? 'Reabrir' : 'Concluir'}
//                   onPress={() => toggleTaskCompletion(item.id)}
//                 />
//                 <Button
//                   title="Editar"
//                   onPress={() => handleEditTask(item.id)}
//                 />
//                 <Button
//                   title="Excluir"
//                   onPress={() => deleteTask(item.id)}
//                 />
//               </View>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   filterContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10, // Espaço entre os botões de filtro e a lista
//   },
//   taskContainer: {
//     flexDirection: 'column',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
//   completedTask: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//   },
// });
