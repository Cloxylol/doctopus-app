import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import AccueilScreen from './screens/AccueilScreen';
import DashboardAdmin from './screens/DashboardAdmin';
import DashboardAdminMedecin from './screens/DashboardAdminMedecin';
import AjoutMedecinForm from './screens/AjoutMedecinForm';
import ModifierMedecinForm from './screens/ModifierMedecinForm';
import DashboardAdminRh from './screens/DashboardAdminRh';
import AjoutRhForm from './screens/AjoutRhForm';
import ModifierRhForm from './screens/ModifierRhForm';
import DashboardRh from './screens/DashboardRh';
import AjoutPatientForm from './screens/AjoutPatientForm';
import ModifierPatientForm from './screens/ModifierPatientForm';
import DashboardMedecin from './screens/DashboardMedecin';
import ListeMedicamentsScreen from './screens/ListeMedicamentsSceen';
import AjoutMedicamentForm from './screens/AjoutMedicamentForm';
import ModifierMedicamentForm from './screens/ModifierMedicamentForm';
import MesPatientsScreen from './screens/MesPatientsScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Accueil" component={AccueilScreen} />
        <Stack.Screen name="Admin" component={DashboardAdmin} />
        <Stack.Screen name="AdminMedecin" component={DashboardAdminMedecin} />
        <Stack.Screen name="AjouterMedecin" component={AjoutMedecinForm} />
        <Stack.Screen name="ModifierMedecin" component={ModifierMedecinForm} />
        <Stack.Screen name="AdminRh" component={DashboardAdminRh} />
        <Stack.Screen name="AjouterRh" component={AjoutRhForm} />
        <Stack.Screen name="ModifierRh" component={ModifierRhForm} />
        <Stack.Screen name="Rh" component={DashboardRh} />
        <Stack.Screen name="AjouterPatient" component={AjoutPatientForm} />
        <Stack.Screen name="ModifierPatient" component={ModifierPatientForm} />
        <Stack.Screen name="Médecin" component={DashboardMedecin} />
        <Stack.Screen name="ListeMedicaments" component={ListeMedicamentsScreen} />
        <Stack.Screen name="AjouterMedicament" component={AjoutMedicamentForm} />
        <Stack.Screen name="ModifierMedicament" component={ModifierMedicamentForm} />
        <Stack.Screen name="MesPatients" component={MesPatientsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
