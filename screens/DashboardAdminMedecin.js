import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


export default function DashboardAdminMedecin({ navigation }) {
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchMedecins = async () => {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/medecins`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    setMedecins(data);
  } catch (error) {
    console.error('Erreur de chargement :', error);
    Alert.alert('Erreur', 'Impossible de charger les médecins');
  }
  setLoading(false);
};

const deleteMedecin = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${API_URL}/medecins/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      fetchMedecins();
    } else {
      Alert.alert('Erreur', 'Échec de la suppression');
    }
  } catch (error) {
    console.error('Erreur suppression :', error);
    Alert.alert('Erreur', 'Problème de connexion au serveur');
  }
};

useFocusEffect(
  useCallback(() => {
    fetchMedecins();
  }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Médecins</Text>

      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <FlatList
          data={medecins}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nom}>{item.nom} ({item.specialite})</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Button title="Modifier" onPress={() => navigation.navigate('ModifierMedecin', { medecin: item })} />
              <Button title="Supprimer" onPress={() => deleteMedecin(item._id)} />
            </View>
          )}
        />
      )}

      <Button title="Ajouter un médecin" onPress={() => navigation.navigate('AjouterMedecin')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { marginBottom: 15, padding: 10, backgroundColor: '#eee', borderRadius: 6 },
  nom: { fontWeight: 'bold' },
  email: { fontStyle: 'italic', color: '#444' },
});
