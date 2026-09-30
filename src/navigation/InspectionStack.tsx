import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InspectionStackParamList } from './types';
import InspectionFormScreen from '../screens/InspectionFormScreen';
import ReviewScreen from '../screens/ReviewScreen';

const Stack = createNativeStackNavigator<InspectionStackParamList>();

export default function InspectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InspectionForm"
        component={InspectionFormScreen}
        options={{ title: 'New Inspection' }}
      />
      <Stack.Screen name="Review" component={ReviewScreen} options={{ title: 'Review Inspection' }} />
    </Stack.Navigator>
  );
}