import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/LoginScreen';
import RegisterScreen from './app/RegisterScreen';
import NavigationTabs from './app/NavigationsTabs';
import {RecoilRoot} from "recoil";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <RecoilRoot>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name='Home' component={NavigationTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </RecoilRoot>
  );
}
