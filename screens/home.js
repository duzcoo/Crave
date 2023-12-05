import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

import FoodInsightsScreen from './FoodInsightsScreen';
import RecommendationScreen from './RecommendationsScreen';
import SocialShareScreen from './SocialShareScreen';
import AccountScreen from './AccountScreen'; // Import the Account screen
import AboutScreen from './AboutScreen'; // Import the About screen

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Food Insights') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'Recommendations') {
            iconName = focused ? 'ios-star' : 'ios-star-outline';
          } else if (route.name === 'Social Share') {
            iconName = focused ? 'ios-share' : 'ios-share-outline';
          } else if (route.name === 'Account') { // Add an icon for the Account screen
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'About') { // Add an icon for the About screen
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Food Insights" component={FoodInsightsScreen} />
      <Tab.Screen name="Recommendations" component={RecommendationScreen} />
      <Tab.Screen name="Social Share" component={SocialShareScreen} />
      <Tab.Screen name="Account" component={AccountScreen} /> 
      <Tab.Screen name="About" component={AboutScreen} /> 
    </Tab.Navigator>
  );
};

export default Home;
