// App.js
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import Leaderboard from './screens/LeaderboardScreen';
import Profile from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import CourseDetailScreen from './screens/CourseDetailScreen'; 


import { ThemeProvider, useThemeContext } from './context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom tab navigation (Home, Map, Leaderboard, Profile)
const TabNavigator = ({ routes, setRoutes }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Map') iconName = 'map';
        else if (route.name === 'Leaderboard') iconName = 'trophy';
        else if (route.name === 'Profile') iconName = 'person';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home">
      {() => <Home routes={routes} setRoutes={setRoutes} />}
    </Tab.Screen>
    <Tab.Screen name="Map">
      {() => <MapScreen routes={routes} />}
    </Tab.Screen>
    <Tab.Screen name="Leaderboard" component={Leaderboard} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

// Stack navigation wraps the tabs + extra screens like Settings
const Main = ({ routes, setRoutes }) => {
  const { theme, isDark } = useThemeContext();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#121212' : '#ffffff'}
      />
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          {/* This is your tab bar at the root */}
          <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
            {() => <TabNavigator routes={routes} setRoutes={setRoutes} />}
          </Stack.Screen>

          {/* Add your course detail screen here */}
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetailScreen}
            options={{ title: 'Course Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


const defaultRoutes = [
  {
    id: '67',
    name: 'NELSON-SHELL',
    type: 'Campus',
    city: 'Atlanta',
    state: 'Georgia',
    country: 'USA',
    rating: 'Blue+',
    topMale: 'Joey Jepsen',
    topMaleTime: '22.26',
    topMaleDate: '2024-10-20',
    topFemale: 'Taylor Carpenter',
    topFemaleTime: '35.56',
    topFemaleDate: '2024-10-20',
    deviationSec: '13.30',
    deviationPct: '37.40',
    lengthM: 75.00,
    avgSpeed: 3.37,
    location: '33.77831, -84.40532',
    dateSet: '2024-10-20',
    googleMaps: 'https://www.google.com/maps?q=33.77831,-84.40532',
    setters: 'Joey Jepsen, Olof Wood, Taylor Carpenter, Max Calderon, Austin Scott, Ryan Ford',
    accepted: false
  }
];

export default function App() {
  const [routes, setRoutes] = useState([]);

  return (
    <ThemeProvider>
      <Main routes={routes} setRoutes={setRoutes} />
    </ThemeProvider>
  );
}
