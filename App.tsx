import React from 'react';
import { UserProvider } from './contexts/UserContext';
import NavigationTabs from './components/NavigationTabs/NavigationsTabs';


export default function App() {
  return (
    <UserProvider>
      <NavigationTabs />
    </UserProvider>
  );
}
