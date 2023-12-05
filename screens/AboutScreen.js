import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';

const GitHubButton = ({ url }) => {
  return (
    <TouchableOpacity
      style={styles.githubButton}
      onPress={() => Linking.openURL(url)}>
      <Text style={styles.githubButtonText}>GitHub</Text>
    </TouchableOpacity>
  );
};

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>About the App</Text>
        <Text style={styles.description}>
          This app is designed to help you discover and share information about food and menus.
          It provides insights into food items, allows you to scan menus, and offers personalized recommendations.
        </Text>
        <Text style={styles.version}>Version 1.0</Text>
        <GitHubButton url="https://github.com/duzcoo/Crave" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#555',
    marginBottom: 24,
    textAlign: 'justify',
  },
  version: {
    fontSize: 16,
    color: '#888',
    marginTop: 20,
    alignSelf: 'center',
    padding: 8,
    backgroundColor: '#eaeaea',
    borderRadius: 4,
  },
  githubButton: {
    marginTop: 20,
    backgroundColor: '#333', // GitHub color
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  githubButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AboutScreen;
