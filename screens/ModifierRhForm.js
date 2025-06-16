import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function ModifierRhForm({ route, navigation }) {
  const { rh } = route.params;

  const [email, setEmail] = useState(rh.email);
  const [motDePasse, setMotDePasse] = useState('');

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/rh/${rh._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email,
          ...(motDePasse ? { motDePasse } : {})
        })
      });

      if (response.ok) {
        Alert.alert('Succès', 'RH modifié');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur réseau', 'Connexion impossible au serveur');
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
        />
        <TextInput
          style={styles.input}
          placeholder="Nouveau mot de passe (facultatif)"
          secureTextEntry
          value={motDePasse}
          onChangeText={setMotDePasse}
        />

        <TouchableOpacity style={styles.crudAddButton} onPress={handleUpdate}>
          <Text style={styles.crudAddButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
