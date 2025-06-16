import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function ModifierMedecinForm({ route, navigation }) {
  const { medecin } = route.params;

  const [nom, setNom] = useState(medecin.nom);
  const [specialite, setSpecialite] = useState(medecin.specialite);
  const [email, setEmail] = useState(medecin.email);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/medecins/${medecin._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify({ nom, specialite, email })
      });

      if (response.ok) {
        Alert.alert('Succès', 'Médecin modifié');
        navigation.goBack();
      } else {
        Alert.alert('Erreur', 'Échec de la modification');
      }
    } catch (error) {
      console.error('Erreur update :', error);
      Alert.alert('Erreur', 'Connexion au serveur impossible');
    }
  };

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/doctopus-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Formulaire - Médecin</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Spécialité"
          value={specialite}
          onChangeText={setSpecialite}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.crudAddButton} onPress={handleUpdate}>
          <Text style={styles.crudAddButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
