import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function DashboardRH({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Erreur chargement patients :', error);
      Alert.alert('Erreur', 'Impossible de charger les patients');
    }
    setLoading(false);
  };

  const deletePatient = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/patients/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        fetchPatients(); // recharge
      } else {
        Alert.alert('Erreur', 'Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur suppression :', error);
      Alert.alert('Erreur', 'Connexion au serveur impossible');
    }
  };

  useFocusEffect(useCallback(() => {
    fetchPatients();
  }, []));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des Patients</Text>

      {loading ? (
        <Text>Chargement...</Text>
      ) : (
        <FlatList
          data={patients}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nom}>{item.nom} {item.prenom}</Text>
              <Text>Âge : {item.age}</Text>
              <Text>Poids : {item.poids} kg</Text>
              <Text>Taille : {item.taille} cm</Text>
              <Text>Traitement : {item.traitementEnCours}</Text>
              <Button
                title="Modifier"
                onPress={() => navigation.navigate('ModifierPatient', { patient: item })}
              />
              <Button
                title="Supprimer"
                onPress={() =>
                  Alert.alert('Confirmation', 'Supprimer ce patient ?', [
                    { text: 'Annuler' },
                    { text: 'Confirmer', onPress: () => deletePatient(item._id) }
                  ])
                }
              />
            </View>
          )}
        />
      )}

      <Button title="Ajouter un patient" onPress={() => navigation.navigate('AjouterPatient')} />
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
  nom: { fontWeight: 'bold' }
});
