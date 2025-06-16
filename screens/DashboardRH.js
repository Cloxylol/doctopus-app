import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function DashboardRH({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredPatients = patients.filter((p) =>
    `${p.nom} ${p.prenom}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/rh-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Gestion des Patients</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un patient..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <Text style={{ marginTop: 10 }}>Chargement...</Text>
      ) : (
        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.crudCard}>
              <Text style={styles.crudTitle}>{item.nom} {item.prenom}</Text>
              <Text style={styles.crudSubtext}>Âge : {item.age}</Text>
              <Text style={styles.crudSubtext}>Poids : {item.poids} kg</Text>
              <Text style={styles.crudSubtext}>Taille : {item.taille} cm</Text>

              <Text style={[styles.crudSubtext, { fontWeight: 'bold', marginTop: 6 }]}>Médicaments :</Text>
              {item.medicaments && item.medicaments.length > 0 ? (
                item.medicaments.map((med) => (
                  <Text key={med._id || med} style={[styles.crudSubtext, { marginLeft: 10 }]}>
                    • {med.nom || 'Inconnu'}
                  </Text>
                ))
              ) : (
                <Text style={[styles.crudSubtext, { marginLeft: 10, fontStyle: 'italic' }]}>
                  Aucun médicament
                </Text>
              )}

              <View style={styles.crudActions}>
                <TouchableOpacity
                  style={styles.crudButton}
                  onPress={() => navigation.navigate('ModifierPatient', { patient: item })}
                >
                  <Text style={styles.crudButtonText}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.crudButton}
                  onPress={() =>
                    Alert.alert('Confirmation', 'Supprimer ce patient ?', [
                      { text: 'Annuler' },
                      { text: 'Confirmer', onPress: () => deletePatient(item._id) }
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
      onPress={() => navigation.navigate('AjouterPatient')}
    >
      <Text style={styles.crudAddButtonText}>Ajouter un patient</Text>
    </TouchableOpacity>
    </View>
  );
}
