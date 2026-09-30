import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecordsStackParamList } from './types';
import RecordsScreen from '../screens/RecordsScreen';
import InspectionDetailsScreen from '../screens/InspectionDetailsScreen';

const Stack = createNativeStackNavigator<RecordsStackParamList>();

export default function RecordsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecordsList" component={RecordsScreen} options={{ title: 'Records' }} />
      <Stack.Screen
        name="InspectionDetails"
        component={InspectionDetailsScreen}
        options={{ title: 'Inspection Details' }}
      />
    </Stack.Navigator>
  );
}