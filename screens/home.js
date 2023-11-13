import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

import MenuScanScreen from './MenuScanScreen';
import FoodInsightsScreen from './FoodInsightsScreen';
import RecommendationScreen from './RecommendationsScreen';
import SocialShareScreen from './SocialShareScreen';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Food Insights') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'Menu Scan') {
            iconName = focused ? 'ios-camera' : 'ios-camera-outline';
          } else if (route.name === 'Recommendations') {
            iconName = focused ? 'ios-star' : 'ios-star-outline';
          } else if (route.name === 'Social Share') {
            iconName = focused ? 'ios-share' : 'ios-share-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Food Insights" component={FoodInsightsScreen} />
      <Tab.Screen name="Menu Scan" component={MenuScanScreen} />
      <Tab.Screen name="Recommendations" component={RecommendationScreen} />
      <Tab.Screen name="Social Share" component={SocialShareScreen} />
    </Tab.Navigator>
  );
};

export default Home;
