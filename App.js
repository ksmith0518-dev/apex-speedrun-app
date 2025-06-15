import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

const routes = [
  {
    id: 'route1',
    name: 'Main Wall Sprint',
    start: { latitude: 39.7392, longitude: -104.9903 },
    end: { latitude: 39.7412, longitude: -104.9923 },
    difficulty: 'Advanced'
  },
  {
    id: 'route2',
    name: 'Alley Cat Run',
    start: { latitude: 39.7385, longitude: -104.989 },
    end: { latitude: 39.7390, longitude: -104.991 },
    difficulty: 'Intermediate'
  }
];

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 39.7392,
          longitude: -104.9903,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}>
        {routes.map(route => (
          <>
            <Marker key={route.id + '_start'} coordinate={route.start} title={`${route.name} Start`} />
            <Marker key={route.id + '_end'} coordinate={route.end} title={`${route.name} End`} />
            <Polyline
              key={route.id + '_line'}
              coordinates={[route.start, route.end]}
              strokeColor="blue"
              strokeWidth={3}
            />
          </>
        ))}
      </MapView>

      <View style={styles.listContainer}>
        <FlatList
          horizontal
          data={routes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.routeCard} onPress={() => setSelectedRoute(item)}>
              <Text style={styles.routeTitle}>{item.name}</Text>
              <Text style={styles.routeDifficulty}>{item.difficulty}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.mediaContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Photo/Video</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.preview} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    top: 40,
    width: '100%'
  },
  routeCard: {
    backgroundColor: 'white',
    margin: 5,
    padding: 10,
    borderRadius: 10
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  routeDifficulty: {
    fontSize: 12
  },
  mediaContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  preview: {
    marginTop: 10,
    width: 200,
    height: 200,
    borderRadius: 10
  }
});
