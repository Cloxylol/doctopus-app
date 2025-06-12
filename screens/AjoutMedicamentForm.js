import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { API_URL } from '../config';

export default function AjoutMedicamentForm({ navigation }) {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!nom || !description) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(`${API_URL}/medicaments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom, description })
      });

      if (response.ok) {
        Alert.alert('Succès', 'Médicament ajouté');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (error) {
      console.error('Erreur ajout médicament :', error);
      Alert.alert('Erreur réseau', 'Impossible de contacter le serveur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Médicament</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom du médicament"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Ajouter" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: '#fff'
  }
});
