import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function ListeMedicamentsScreen({ navigation }) {
  const [medicaments, setMedicaments] = useState([]);

  const fetchMedicaments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/medicaments`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMedicaments(data);
    } catch (error) {
      console.error('Erreur de chargement :', error);
      Alert.alert('Erreur', 'Impossible de charger les médicaments');
    }
  };

  const deleteMedicament = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/medicaments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchMedicaments();
      } else {
        Alert.alert('Erreur', 'Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur suppression :', error);
      Alert.alert('Erreur', 'Connexion impossible au serveur');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedicaments();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Médicaments</Text>

      <FlatList
        data={medicaments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nom}>{item.nom}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <Button
              title="Modifier"
              onPress={() => navigation.navigate('ModifierMedicament', { medicament: item })}
            />
            <Button
              title="Supprimer"
              onPress={() => deleteMedicament(item._id)}
            />
          </View>
        )}
      />

      <Button title="Ajouter un médicament" onPress={() => navigation.navigate('AjouterMedicament')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { marginBottom: 15, padding: 10, backgroundColor: '#eee', borderRadius: 6 },
  nom: { fontWeight: 'bold' },
  desc: { fontStyle: 'italic', color: '#444' },
});
