// LoginScreen.js
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

const LoginScreen = ({ navigation }) => { // Make sure to receive the navigation prop here
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Test credentials, replace with your authentication logic
  const testCredentials = {
    email: 'testuser@example.com',
    password: 'testpassword',
  };

  const handleLogin = () => {
    if (email === testCredentials.email && password === testCredentials.password) {
      // Navigate to the Home screen if login is successful
      navigation.replace('Home'); // Using replace so the user can't go back to the login screen with the Android back button
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
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
      {/* ... other components ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Set your desired solid background color here
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
  orText: {
    color: 'black',
    marginVertical: 10,
  },
});

// Make sure to replace './path-to-your-logo.png' with the actual path to your logo image
export default LoginScreen;
