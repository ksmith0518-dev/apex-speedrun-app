// App.js
import React, { useState } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


import Home from './screens/HomeScreen.js';
import MapScreen from './screens/MapScreen.js';
import Leaderboard from './screens/LeaderboardScreen.js';
import Profile from './screens/ProfileScreen.js';

const Tab = createBottomTabNavigator();

const Main = () => {
  const { theme } = useThemeContext();
  return (
    <NavigationContainer theme={theme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  const [routes, setRoutes] = useState([]);

  return (
    <NavigationContainer>
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
          tabBarInactiveTintColor: 'gray'
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
    </NavigationContainer>
  );
}