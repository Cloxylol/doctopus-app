import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function AjouterRhForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = async () => {
    if (!email || !motDePasse) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/rh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, motDePasse, role: 'RH' })
      });

      if (response.ok) {
        Alert.alert('Succès', 'RH ajouté avec succès');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur réseau', 'Connexion au serveur impossible');
    }
  };

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/rh-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Formulaire - RH</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
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
          secureTextEntry
          value={motDePasse}
          onChangeText={setMotDePasse}
        />

        <TouchableOpacity style={styles.crudAddButton} onPress={handleSubmit}>
          <Text style={styles.crudAddButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
