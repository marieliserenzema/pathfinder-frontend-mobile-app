import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CommunityScreen from './app/community';
import AccountScreen from './app/account';
import SavedScreen from './app/saved';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ExploreScreen from './app/explore';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            if (route.name === "Explore") {
              iconName = "find";
            } else if (route.name === 'Community') {
              iconName = "hearto";
            } else if (route.name === 'Saved') {
              iconName = "book";
            } else if (route.name === 'Account') {
              iconName = "user";
            } else {
              iconName = '';
            }
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        }}
       >
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}
