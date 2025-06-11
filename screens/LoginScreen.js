import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';



export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse: password })
      });

      const data = await response.json();
      console.log('Réponse API :', data);

      if (response.ok && data.user && data.token) {
  const role = data.user.role.toLowerCase();

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('role', role);

      if (role === 'rh') navigation.navigate('RH');
      else if (role === 'medecin') navigation.navigate('Médecin');
      else if (role === 'admin') navigation.navigate('Admin');
      else Alert.alert('Erreur', 'Rôle inconnu');
    } else {
        Alert.alert('Erreur', data.error || 'Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur réseau ou JSON :', error);
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 }
});
