import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InspectionsProvider } from './src/context/InspectionsContext';
import AppTabs from './src/navigation/AppTabs';

export default function App() {
  return (
    <SafeAreaProvider>
      <InspectionsProvider>
        <NavigationContainer>
          <AppTabs />
        </NavigationContainer>
      </InspectionsProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}