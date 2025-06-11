import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { API_URL } from '../config';


export default function AjouterRhForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = async () => {
    if (!email || !motDePasse) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('${API_URL}/auth/register', {
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
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un RH</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={motDePasse}
        onChangeText={setMotDePasse}
      />
      <Button title="Enregistrer" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 6 }
});
