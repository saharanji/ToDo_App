import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [buttonScale] = useState({
    All: new Animated.Value(1),
    Completed: new Animated.Value(1),
    Pending: new Animated.Value(1),
  });

  useEffect(() => {
    const loadTasks = async () => {
      const data = await AsyncStorage.getItem('tasks');
      if (data) setTasks(JSON.parse(data));
    };
    const unsubscribe = navigation.addListener('focus', loadTasks);
    return unsubscribe;
  }, [navigation]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    Animated.sequence([
      Animated.timing(buttonScale[newFilter], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale[newFilter], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const deleteAllTasks = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete all tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('tasks');
            setTasks([]); // Clear tasks from state
          },
        },
      ]
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {['All', 'Completed', 'Pending'].map((item) => (
          <Animated.View
            key={item}
            style={[
              styles.filterButton,
              {
                transform: [{ scale: buttonScale[item] }],
                backgroundColor: filter === item ? '#007BFF' : '#E0E0E0',
              },
            ]}
          >
            <TouchableOpacity onPress={() => handleFilterChange(item)}>
              <Text style={{ color: filter === item ? '#FFF' : '#000' }}>{item}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
      <ScrollView>
        {filteredTasks.length === 0 ? (
          <Text>No Tasks Available</Text>
        ) : (
          filteredTasks.map((task, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Task', { task, index })}
              style={styles.taskItem}
            >
              <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>{task.title}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <Button title="Add Task" onPress={() => navigation.navigate('Task')} />
      <Button title="Delete All Tasks" onPress={deleteAllTasks} color="red" /> {/* New Button */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
});