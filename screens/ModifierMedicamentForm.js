import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../config';

export default function ModifierMedicamentForm({ route, navigation }) {
  const { medicament } = route.params;

  const [nom, setNom] = useState(medicament.nom);
  const [posologie, setPosologie] = useState(medicament.posologie);

  const handleUpdate = async () => {
    if (!nom || !posologie) {
      return Alert.alert('Erreur', 'Tous les champs sont requis');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/medicaments/${medicament._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom, posologie })
      });

      if (response.ok) {
        Alert.alert('Succès', 'Médicament modifié');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (err) {
      console.error('Erreur modification :', err);
      Alert.alert('Erreur réseau', 'Impossible de contacter le serveur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un médicament</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Posologie"
        value={posologie}
        onChangeText={setPosologie}
      />
      <Button title="Modifier" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 6 }
});
