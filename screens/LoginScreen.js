import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username !== '' && password !== '') {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Username:</Text>
      <TextInput style={styles.input} onChangeText={setUsername} value={username} />
      <Text>Password:</Text>
      <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    shadowColor: '#007BFF',
    shadowOffset: { width: 2, height: 4 },
    marginBottom: 10,
    padding: 8,
  },
});