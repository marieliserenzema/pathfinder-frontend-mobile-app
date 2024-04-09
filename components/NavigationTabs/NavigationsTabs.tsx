import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import CommunityScreen from '../../app/community';
import SavedScreen from '../../app/saved';
import ExploreScreen from '../../app/explore';
import { useUserContext } from '../../contexts/UserContext';
import LoginScreen from '../LoginScreen/LoginScreen';
import ProfileScreen from '../../app/profile';
const Tab = createBottomTabNavigator();

export default function NavigationTabs() {

    const { isConnect } = useUserContext();

  return (

    <NavigationContainer>
            { isConnect() ? (
       <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({color, size }) => {
            let iconName: string;
            if (route.name === "Explorer") {
              iconName = "find";
            } else if (route.name === "Communauté") {
              iconName = "hearto";
            } else if (route.name === "Favoris") {
              iconName = "book";
            } else if (route.name === "Profil") {
              iconName = "user";
            } else {
              iconName = '';
            }
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Explorer" component={ExploreScreen} options={{ headerShown: false }}  />
        <Tab.Screen name="Communauté" component={CommunityScreen} />
        <Tab.Screen name="Favoris" component={SavedScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>):
    <LoginScreen />
    }
    </NavigationContainer>
  );
}
