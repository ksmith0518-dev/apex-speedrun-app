// ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={profileImage ? { uri: profileImage } : require('../assets/default-profile.jpg')}
        style={styles.profileImage}
      />
      <Button title="Edit Photo" onPress={pickImage} />
      <Text style={styles.username}>JohnDoe42</Text>

      <Text style={styles.stat}>Total Runs: 24</Text>
      <Text style={styles.stat}>Best Run: Main Wall Sprint</Text>
      <Text style={styles.stat}>Best Time: 00:34.12</Text>
      <Text style={styles.stat}>Courses Set: 5</Text>
      <Text style={styles.stat}>Overall Rating: 4.7 ⭐</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  stat: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: 'center',
  },
});

export default ProfileScreen;
