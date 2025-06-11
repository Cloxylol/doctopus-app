import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../config';


export default function ModifierMedecinForm({ route, navigation }) {
  const { medecin } = route.params;

  const [nom, setNom] = useState(medecin.nom);
  const [specialite, setSpecialite] = useState(medecin.specialite);
  const [email, setEmail] = useState(medecin.email);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/medecins/${medecin._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    <View style={styles.container}>
      <Text style={styles.title}>Modifier Médecin</Text>

      <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Nom" />
      <TextInput style={styles.input} value={specialite} onChangeText={setSpecialite} placeholder="Spécialité" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />

      <Button title="Enregistrer les modifications" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 6 }
});
