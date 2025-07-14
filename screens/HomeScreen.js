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
import { useThemeContext } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const Home = ({ routes, setRoutes }) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newRoute, setNewRoute] = useState({
    name: '',
    startLat: '',
    startLng: ''
  });

  const { isDark } = useThemeContext();
  const navigation = useNavigation();

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#121212' : 'white',
    },
    searchBar: {
      borderWidth: 1,
      borderColor: isDark ? '#444' : '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      color: isDark ? '#fff' : '#000',
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#fff' : '#000',
    },
    routeCard: {
      backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
    },
    routeTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
    addButton: {
      backgroundColor: '#1e90ff',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
    },
    modalContent: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#555' : '#ccc',
      padding: 10,
      marginVertical: 8,
      color: isDark ? '#fff' : '#000',
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
    }
  });

 
  //console.log('Routes in HomeScreen:', routes);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search routes or users..."
        placeholderTextColor={isDark ? '#888' : '#999'}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.title}>Local / New Routes</Text>

      <FlatList
        data={routes.filter(route =>
          route.name?.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.routeCard}
            onPress={() => navigation.navigate('CourseDetail', { course: item })}
          >
            <Text style={styles.routeTitle}>{item.name}</Text>
            {item.city && (
              <Text style={{ color: isDark ? '#ccc' : '#333' }}>
                {item.city}, {item.state}
              </Text>
            )}
          </TouchableOpacity>
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
            placeholderTextColor={isDark ? '#888' : '#999'}
            style={styles.input}
            value={newRoute.name}
            onChangeText={text => setNewRoute({ ...newRoute, name: text })}
          />
          <TextInput
            placeholder="Start Latitude"
            placeholderTextColor={isDark ? '#888' : '#999'}
            style={styles.input}
            keyboardType="numeric"
            value={newRoute.startLat}
            onChangeText={text => setNewRoute({ ...newRoute, startLat: text })}
          />
          <TextInput
            placeholder="Start Longitude"
            placeholderTextColor={isDark ? '#888' : '#999'}
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

export default Home;
