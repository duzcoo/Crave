import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/home';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import AccountScreen from './screens/AccountScreen'; // Import the Account screen
import AboutScreen from './screens/AboutScreen'; // Import the About screen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'Create an Account' }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        {/* Add the Account and About screens to the stack */}
        <Stack.Screen name="Account" component={AccountScreen} options={{ title: 'My Account' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About the App' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
