import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import DashboardRH from './screens/DashboardRH';
import DashboardMedecin from './screens/DashboardMedecin';
import DashboardAdmin from './screens/DashboardAdmin';
import AjoutMedecinForm from './screens/AjoutMedecinForm';
import ModifierMedecinForm from './screens/ModifierMedecinForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RH" component={DashboardRH} />
        <Stack.Screen name="Médecin" component={DashboardMedecin} />
        <Stack.Screen name="Admin" component={DashboardAdmin} />
        <Stack.Screen name="AjouterMedecin" component={AjoutMedecinForm} />
        <Stack.Screen name="ModifierMedecin" component={ModifierMedecinForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
