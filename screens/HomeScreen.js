import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';

const dummyRoutes = [
  { id: '1', name: 'Main Wall Sprint', location: 'Denver' },
  { id: '2', name: 'Alley Cat Run', location: 'Boulder' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search routes or users"
      />
      <Text style={styles.header}>New/Local Routes</Text>
      <FlatList
        data={dummyRoutes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.routeCard}>
            <Text style={styles.routeName}>{item.name}</Text>
            <Text style={styles.routeLocation}>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  searchBar: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  routeCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1
  },
  routeName: { fontSize: 16, fontWeight: 'bold' },
  routeLocation: { fontSize: 12, color: 'gray' },
});
