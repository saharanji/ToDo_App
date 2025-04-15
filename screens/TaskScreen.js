import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Switch, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaskScreen({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [completed, setCompleted] = useState(false);
  const index = route.params?.index;

  useEffect(() => {
    if (route.params?.task) {
      const { title, description, completed } = route.params.task;
      setTitle(title);
      setDesc(description);
      setCompleted(completed);
    }
  }, []);

  const saveTask = async () => {
    if (!title) return;
    const data = await AsyncStorage.getItem('tasks');
    const tasks = data ? JSON.parse(data) : [];

    if (typeof index === 'number') {
      tasks[index] = { title, description: desc, completed };
    } else {
      tasks.push({ title, description: desc, completed });
    }

    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    navigation.goBack();
  };

  const deleteTask = async () => {
    const data = await AsyncStorage.getItem('tasks');
    const tasks = data ? JSON.parse(data) : [];
    if (typeof index === 'number') {
      tasks.splice(index, 1);
    }
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={desc} onChangeText={setDesc} style={styles.input} />
      <View style={styles.switchRow}>
        <Switch value={completed} onValueChange={setCompleted} />
        <Text style={styles.switchLabel}>Completed</Text>
      </View>
      <Button title="Save" onPress={saveTask} />
      {typeof index === 'number' && <Button title="Delete" onPress={deleteTask} color="red" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});