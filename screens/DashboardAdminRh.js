import React, { useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function DashboardAdminRh({ navigation }) {
  const [users, setUsers] = useState([]);

  const fetchRH = async () => {
    
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/rh`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      const rhUsers = data.filter((user) => user.role === 'RH');
      setUsers(rhUsers);
    } catch (error) {
      console.error('Erreur chargement RH :', error);
      Alert.alert('Erreur', 'Impossible de charger les RH');
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/rh/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchRH(); // recharge après suppression
      } else {
        Alert.alert('Erreur', 'Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur suppression RH :', error);
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRH();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des RH</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.email}>{item.email}</Text>
            <Button
              title="Modifier"
              onPress={() => navigation.navigate('ModifierRh', { rh: item })}
            />
            <Button
              title="Supprimer"
              onPress={() => deleteUser(item._id)}
            />
          </View>
        )}
      />

      <Button title="Ajouter un RH" onPress={() => navigation.navigate('AjouterRh')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 6
  },
  email: { fontStyle: 'italic', color: '#444' }
});
