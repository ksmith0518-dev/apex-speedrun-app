// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import Leaderboard from './screens/LeaderboardScreen';
import Profile from './screens/ProfileScreen';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ routes, setRoutes }) => {
  return (
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
};

const Main = ({ routes, setRoutes }) => {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer theme={theme}>
      <TabNavigator routes={routes} setRoutes={setRoutes} />
    </NavigationContainer>
  );
};

export default function App() {
  const [routes, setRoutes] = useState([]);

  return (
    <ThemeProvider>
      <Main routes={routes} setRoutes={setRoutes} />
    </ThemeProvider>
  );
}
