import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function ListeMedicamentsScreen({ navigation }) {
  const [medicaments, setMedicaments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredMedicaments = medicaments.filter(m =>
    m.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/doc-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Liste des Médicaments</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un médicament..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredMedicaments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.crudCard}>
            <Text style={styles.crudTitle}>{item.nom}</Text>
            <Text style={styles.crudSubtext}>{item.description}</Text>

            {item.photoBase64 && (
              <Image
                source={{ uri: item.photoBase64 }}
                style={{ width: '100%', height: 150, marginTop: 10, borderRadius: 8 }}
                resizeMode="cover"
              />
            )}

            <View style={styles.crudActions}>
              <TouchableOpacity
                style={styles.crudButton}
                onPress={() => navigation.navigate('MedicamentForm', { medicament: item })}
              >
                <Text style={styles.crudButtonText}>Modifier</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.crudButton}
                onPress={() => deleteMedicament(item._id)}
              >
                <Text style={styles.crudButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.crudAddButton}
        onPress={() => navigation.navigate('MedicamentForm')}
      >
        <Text style={styles.crudAddButtonText}>Ajouter un médicament</Text>
      </TouchableOpacity>
    </View>
  );
}
