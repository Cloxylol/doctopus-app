import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../config';


export default function ModifierRhForm({ route, navigation }) {
  const { rh } = route.params;

  const [email, setEmail] = useState(rh.email);
  const [motDePasse, setMotDePasse] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${rh._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un RH</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={motDePasse}
        onChangeText={setMotDePasse}
        placeholder="Nouveau mot de passe (facultatif)"
        secureTextEntry
      />
      <Button title="Enregistrer les modifications" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 6 }
});
