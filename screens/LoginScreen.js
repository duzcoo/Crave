import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Test credentials, replace with your authentication logic
  const testCredentials = {
    email: 'test@test.com',
    password: 'test',
  };

  const handleLogin = () => {
    if (email === testCredentials.email && password === testCredentials.password) {
      navigation.replace('Home');
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  // Function to navigate to the registration screen
  const handleCreateAccount = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.logo} />
      <Text style={styles.title}>Crave</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* "Create an Account" button */}
      <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
        <Text style={styles.createAccountButtonText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  createAccountButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#800080', // Set your desired button color here
    alignItems: 'center',
    borderRadius: 5,
  },
  createAccountButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;
