import React, { useState } from 'react';
import { View, Alert} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username && !email && !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    // Simple validation passed
    try {
      // Save the user data
      const userData = { username, email, password };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Success', 'Registration successful', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      console.error('Failed to save the data to the storage', error);
      Alert.alert('Error', 'Failed to register');
    }
  };
  return (
    <View style={{ flex: 1,
      justifyContent: 'center',
      backgroundColor: '#307ecc',
      alignContent: 'center'}}>
      <TextInput
        label="Enter your name"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
       <TextInput
        label="Enter your email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Create Password"
        placeholder="Create Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button style={{ backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,}} mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </View>
  );
};

export default RegisterScreen;
