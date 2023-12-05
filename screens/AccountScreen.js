import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    firstName: 'Change',
    lastName: 'Me',
    profilePic: require('./logo.png'),
  });

  const [recentRestaurants, setRecentRestaurants] = useState([]);

  useEffect(() => {
    const loadRecentRestaurants = async () => {
      try {
        const storedRestaurants = await AsyncStorage.getItem('recentRestaurants');
        if (storedRestaurants !== null) {
          setRecentRestaurants(JSON.parse(storedRestaurants));
        }
      } catch (error) {
        console.error('Failed to load the recent restaurants.', error);
      }
    };

    loadRecentRestaurants();
  }, []);

  useEffect(() => {
    const saveRecentRestaurants = async () => {
      try {
        await AsyncStorage.setItem('recentRestaurants', JSON.stringify(recentRestaurants));
      } catch (error) {
        console.error('Failed to save the recent restaurants.', error);
      }
    };

    saveRecentRestaurants();
  }, [recentRestaurants]);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const handleUpdateProfile = (newFirstName, newLastName) => {
    setProfile({ ...profile, firstName: newFirstName, lastName: newLastName });
  };

  const handleSelectPicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setProfile({ ...profile, profilePic: { uri: pickerResult.uri } });
    }
  };

  const handleTakeNewPicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    const cameraResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!cameraResult.cancelled) {
      setProfile({ ...profile, profilePic: { uri: cameraResult.uri } });
    }
  };

  const handleSelectRestaurant = async (restaurantId) => {
    const newRestaurant = { id: restaurantId, name: `Restaurant ${restaurantId}` };
    const updatedRecentRestaurants = [newRestaurant, ...recentRestaurants.filter(restaurant => restaurant.id !== restaurantId)];

    setRecentRestaurants(updatedRecentRestaurants);
    await AsyncStorage.setItem('recentRestaurants', JSON.stringify(updatedRecentRestaurants));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleSelectPicture}>
          <Image source={profile.profilePic} style={styles.profilePic} />
        </TouchableOpacity>
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => handleUpdateProfile(text, profile.lastName)}
          value={profile.firstName}
          placeholder="First Name"
        />
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => handleUpdateProfile(profile.firstName, text)}
          value={profile.lastName}
          placeholder="Last Name"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Recent Restaurants</Text>
        {recentRestaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.option}
            onPress={() => handleSelectRestaurant(restaurant.id)}
          >
            <Text style={styles.optionText}>{restaurant.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.option} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Add your StyleSheet and export statement here...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '80%',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  sectionHeader: {
    padding: 10,
    fontWeight: 'normal',
    fontSize: 16,
    backgroundColor: '#efefef',
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#ff3b30',
    fontWeight: 'normal',
  },
  // ... additional styles if needed ...
});

export default AccountScreen;
