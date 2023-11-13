import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import the Home component which contains the bottom tabs
import Home from './screens/home'; // Make sure the path is correct based on your project structure
import LoginScreen from './screens/LoginScreen';

// Create the stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        {/* 
          The Home screen is now the entry point to the bottom tab navigator.
          The individual screens are now removed from here because they are included within the Home component's tab navigator.
        */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
