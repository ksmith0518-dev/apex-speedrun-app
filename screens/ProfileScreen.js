// ProfileScreen.js
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useThemeContext } from '../context/ThemeContext';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const { isDark } = useThemeContext();

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

  const openSettings = () => {
    navigation.navigate('Settings');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profile',
      headerTitleAlign: 'center',
      headerRight: () => (
        <Ionicons
          name="settings-outline"
          size={24}
          color={isDark ? 'white' : 'black'}
          style={{ marginRight: 15 }}
          onPress={openSettings}
        />
      ),
    });
  }, [navigation, isDark]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    profileSection: {
      alignItems: 'center',
      marginBottom: 30,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 10,
      backgroundColor: '#ccc',
    },
    username: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
      color: isDark ? '#fff' : '#000',
    },
    statsSection: {
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginTop: 10,
      textAlign: 'center',
      color: isDark ? '#ccc' : '#222',
    },
    statValue: {
      fontSize: 16,
      marginBottom: 5,
      textAlign: 'center',
      color: isDark ? '#eee' : '#000',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../assets/default-profile.png')}
          style={styles.profileImage}
        />
        <Button title="Edit Photo" onPress={pickImage} />
        <Text style={styles.username}>JohnDoe42</Text>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.statLabel}>Total Runs:</Text>
        <Text style={styles.statValue}>24</Text>

        <Text style={styles.statLabel}>Best Run:</Text>
        <Text style={styles.statValue}>Main Wall Sprint</Text>

        <Text style={styles.statLabel}>Best Time:</Text>
        <Text style={styles.statValue}>00:34.12</Text>

        <Text style={styles.statLabel}>Courses Set:</Text>
        <Text style={styles.statValue}>5</Text>

        <Text style={styles.statLabel}>Overall Rating:</Text>
        <Text style={styles.statValue}>4.7 ⭐</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
