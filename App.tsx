import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RecoilRoot } from "recoil";

import HikeDetailScreen from "./app/HikeDetailScreen";
import LoginScreen from "./app/LoginScreen";
import NavigationTabs from "./app/NavigationsTabs";
import RegisterScreen from "./app/RegisterScreen";
import { UserProvider } from "./contexts/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={NavigationTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HikeDetail"
              component={HikeDetailScreen}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </RecoilRoot>
  );
}
