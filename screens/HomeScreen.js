// screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const Home = ({ routes, setRoutes }) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newRoute, setNewRoute] = useState({
    name: '',
    startLat: '',
    startLng: ''
  });

  const handleAddRoute = () => {
    const route = {
      id: `route${routes.length + 1}`,
      name: newRoute.name,
      start: {
        latitude: parseFloat(newRoute.startLat),
        longitude: parseFloat(newRoute.startLng)
      }
    };

    setRoutes([...routes, route]);
    setNewRoute({ name: '', startLat: '', startLng: '' });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search routes or users..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.title}>Local / New Routes</Text>

      <FlatList
        data={routes.filter(route =>
          route.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.routeCard}>
            <Text style={styles.routeTitle}>{item.name}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add New Route</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput
            placeholder="Route Name"
            style={styles.input}
            value={newRoute.name}
            onChangeText={text => setNewRoute({ ...newRoute, name: text })}
          />
          <TextInput
            placeholder="Start Latitude"
            style={styles.input}
            keyboardType="numeric"
            value={newRoute.startLat}
            onChangeText={text => setNewRoute({ ...newRoute, startLat: text })}
          />
          <TextInput
            placeholder="Start Longitude"
            style={styles.input}
            keyboardType="numeric"
            value={newRoute.startLng}
            onChangeText={text => setNewRoute({ ...newRoute, startLng: text })}
          />
          <Button title="Save Route" onPress={handleAddRoute} />
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  routeCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  addButtonText: {
    color: 'white',
    fontSize: 16
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 8
  }
});

export default Home;
