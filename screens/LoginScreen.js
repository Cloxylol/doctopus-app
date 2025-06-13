import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import logo from '../assets/logo_sans_fond.png';

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
      if (response.ok && data.user && data.token) {
        const role = data.user.role.toLowerCase();

        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('role', role);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));

        navigation.navigate('Accueil', { role: data.user.role });
      } else {
        Alert.alert('Erreur', data.error || 'Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur réseau ou JSON :', error);
      Alert.alert('Erreur', 'Impossible de se connecter au serveur');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Bienvenue sur Doctopus</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    alignItems: 'center',
    padding: 25
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16
  },
  button: {
    width: '100%',
    backgroundColor: '#83cbc2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  logo: {
  width: 200,
  height: 200,
  marginBottom: 20,
  alignSelf: 'center'
}
});
