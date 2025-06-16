import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles/screen.styles';

export default function DashboardAdminMedecin({ navigation }) {
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredMedecins = medecins.filter((m) =>
    `${m.nom} ${m.specialite} ${m.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/doc-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Gestion des Médecins</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un médecin..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      ) : (
        <FlatList
          data={filteredMedecins}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.crudCard}>
              <Text style={styles.crudTitle}>{item.nom} ({item.specialite})</Text>
              <Text style={styles.crudSubtext}>{item.email}</Text>

              <View style={styles.crudActions}>
                <TouchableOpacity
                  style={styles.crudButton}
                  onPress={() => navigation.navigate('ModifierMedecin', { medecin: item })}
                >
                  <Text style={styles.crudButtonText}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.crudButton}
                  onPress={() =>
                    Alert.alert('Confirmation', 'Supprimer ce médecin ?', [
                      { text: 'Annuler' },
                      { text: 'Confirmer', onPress: () => deleteMedecin(item._id) }
                    ])
                  }
                >
                  <Text style={styles.crudButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.crudAddButton}
        onPress={() => navigation.navigate('AjouterMedecin')}
      >
        <Text style={styles.crudAddButtonText}>Ajouter un médecin</Text>
      </TouchableOpacity>
    </View>
  );
}
