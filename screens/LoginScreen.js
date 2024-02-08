import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        // Check if the entered credentials match the stored credentials
        if (username === userData.username && password === userData.password) {
          // Success, user exists and password matches
          Alert.alert('Login Successful', 'You have successfully logged in.', [
            { text: 'OK', onPress: () => navigation.navigate('ProductList') } // Navigate to your main app screen here
          ]);
        } else {
          // Error, credentials don't match
          Alert.alert('Login Failed', 'Invalid username or password.');
        }
      } else {
        // Error, no user data found
        Alert.alert('Login Failed', 'No registered user found. Please register.');
      }
    } catch (error) {
      Alert.alert('Login Error', 'An error occurred during login.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={{ flex: 1,
      justifyContent: 'center',
      backgroundColor: '#307ecc',
      alignContent: 'center'}}>
      <TextInput
        label="Username"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Password"
        placeholder="Password"
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
    marginBottom: 25,}} mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Button style={{ backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    }}mode="contained" onPress={handleRegister}>
        Don't have an account? Register
      </Button>
    </View>
  );
};

export default LoginScreen;
