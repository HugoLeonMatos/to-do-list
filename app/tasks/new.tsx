
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleAddTask = async () => {
    if (!title || !description) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };

    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];
      const updatedTasks = [...currentTasks, newTask];

      await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
      router.back(); // Voltar à lista de tarefas após adicionar
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a tarefa.");
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
      <Button title="Adicionar Tarefa" onPress={handleAddTask} />
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

// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { useRouter } from "expo-router";
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export default function NewTaskScreen() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const router = useRouter();

//   const handleAddTask = async () => {
//     if (!title || !description) {
//       Alert.alert("Erro", "Por favor, preencha todos os campos.");
//       return;
//     }

//     const newTask = {
//       id: Date.now(), // Gera um ID único baseado no timestamp atual
//       title,
//       description,
//       completed: false, // Por padrão, uma nova tarefa começa como "não completa"
//     };


//     try {
//       const storedTasks = await AsyncStorage.getItem('@tasks');
//       const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];
//       const updatedTasks = [...currentTasks, newTask];

//       await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
//       // console.log(await (AsyncStorage.setItem.arguments));

//       router.back(); // Voltar à lista de tarefas após adicionar
//     } catch (error) {
//       Alert.alert("Erro", "Não foi possível salvar a tarefa.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Título"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Descrição"
//         value={description}
//         onChangeText={setDescription}
//       />
//       <Button title="Adicionar Tarefa" onPress={handleAddTask} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//   },
// });
