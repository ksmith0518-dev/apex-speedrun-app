// SettingsScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handlePress = (label) => {
    console.log(`${label} pressed`);
    if (label === 'Dark Mode') {
      toggleTheme();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? '#121212' : '#ffffff'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: isDark ? '#ffffff' : '#000000'
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 20,
      marginBottom: 10,
      color: isDark ? '#cccccc' : '#444444'
    },
    item: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#333333' : '#eeeeee'
    },
    itemText: {
      fontSize: 16,
      color: isDark ? '#dddddd' : '#000000'
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.sectionHeader}>Display</Text>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Dark Mode')}>
        <Text style={styles.itemText}>Dark Mode</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Support</Text>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Help & Support')}>
        <Text style={styles.itemText}>Help & Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Send Feedback')}>
        <Text style={styles.itemText}>Send Feedback</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Legal</Text>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Privacy Policy')}>
        <Text style={styles.itemText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Terms of Service')}>
        <Text style={styles.itemText}>Terms of Service</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHeader}>Account</Text>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Privacy Settings')}>
        <Text style={styles.itemText}>Privacy Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Email Preferences')}>
        <Text style={styles.itemText}>Email Preferences</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Push Notifications')}>
        <Text style={styles.itemText}>Push Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Change Password')}>
        <Text style={styles.itemText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => handlePress('Log Out')}>
        <Text style={styles.itemText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
