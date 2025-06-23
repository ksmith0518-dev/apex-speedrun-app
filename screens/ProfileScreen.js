import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Text style={styles.info}>Username: your_username</Text>
      <Text style={styles.info}>Total Runs: 10</Text>
      <Text style={styles.info}>Top Route: Main Wall Sprint</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 14, marginBottom: 5 }
});
