import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../config';


export default function AjoutMedecinForm({ navigation }) {
  const [nom, setNom] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!nom || !specialite || !email) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    try {
      const response = await fetch('${API_URL}/medecins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, specialite, email })
      });

      if (response.ok) {
        Alert.alert('Succès', 'Médecin ajouté');
        navigation.goBack(); // retour au dashboard
      } else {
        Alert.alert('Erreur', 'Échec de l’ajout');
        console.log(await response.text());
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Médecin</Text>

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
      <Button title="Enregistrer" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 6 }
});
