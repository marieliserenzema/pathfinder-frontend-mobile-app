import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useUserContext } from '../contexts/UserContext';
import { NavigationProp } from '@react-navigation/native';
import ExploreScreen from '../components/Explore/Explore';
import CommunityScreen from '../components/Community/Community';
import SavedScreen from '../components/Saved/Saved';
import ProfileScreen from '../components/Profile/Profile';



const Tab = createBottomTabNavigator();

interface NavigationTabsProps {
  navigation: NavigationProp<any>;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ navigation }) => {
  const { token } = useUserContext();

  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
    }
  }, [token, navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          if (route.name === 'Explorer') {
            iconName = 'find';
          } else if (route.name === 'Communauté') {
            iconName = 'team';
          } else if (route.name === 'Favoris') {
            iconName = 'hearto';
          } else if (route.name === 'Profil') {
            iconName = 'user';
          } else {
            iconName = '';
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#a3b18a',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Explorer" component={ExploreScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Communauté" component={CommunityScreen} />
      <Tab.Screen name="Favoris" component={SavedScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default NavigationTabs;
