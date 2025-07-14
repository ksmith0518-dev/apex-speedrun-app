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

// Bottom Tab Navigator
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

// Stack Navigator
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
          <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
            {() => <TabNavigator routes={routes} setRoutes={setRoutes} />}
          </Stack.Screen>
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetailScreen}
            options={{ title: 'Course Details' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

// Default route must be set *inside* the App component
export default function App() {
  const [routes, setRoutes] = useState([
    {
      id: 'course-67',
      name: 'NELSON-SHELL',
      rating: 67,
      type: 'Campus',
      city: 'Atlanta',
      state: 'Georgia',
      country: 'USA',
      topMale: {
        name: 'Joey Jepsen',
        time: 22.26,
        date: '2024-10-20',
      },
      topFemale: {
        name: 'Taylor Carpenter',
        time: 35.56,
        date: '2024-10-20',
      },
      timeDiffSeconds: 13.30,
      timeDiffPercent: 37.4,
      lengthMeters: 75.0,
      avgSpeed: 3.37,
      location: {
        latitude: 33.77831,
        longitude: -84.40532,
      },
      dateSet: '2024-10-20',
      accepted: false,
      setters: [
        'Joey Jepsen',
        'Olof Wood',
        'Taylor Carpenter',
        'Max Calderon',
        'Austin Scott',
        'Ryan Ford',
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <Main routes={routes} setRoutes={setRoutes} />
    </ThemeProvider>
  );
}
