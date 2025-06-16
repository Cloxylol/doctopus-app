import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function AjoutMedecinForm({ navigation }) {
  const [nom, setNom] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = async () => {
    if (!nom || !specialite || !email || !motDePasse) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/medecins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom, specialite, email, motDePasse })
      });

      if (response.ok) {
        Alert.alert('Succès', 'Médecin ajouté');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
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
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={motDePasse}
          onChangeText={setMotDePasse}
          secureTextEntry
        />

        <TouchableOpacity style={styles.crudAddButton} onPress={handleSubmit}>
          <Text style={styles.crudAddButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
