import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, TextInput, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function DashboardAdminRh({ navigation }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRH = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/rh`, {
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        fetchRH();
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

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/rh-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Gestion des RH</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher par email..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.crudCard}>
            <Text style={styles.crudTitle}>{item.email}</Text>

            <View style={styles.crudActions}>
              <TouchableOpacity
                style={styles.crudButton}
                onPress={() => navigation.navigate('ModifierRh', { rh: item })}
              >
                <Text style={styles.crudButtonText}>Modifier</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.crudButton}
                onPress={() =>
                  Alert.alert('Confirmation', 'Supprimer ce RH ?', [
                    { text: 'Annuler' },
                    { text: 'Confirmer', onPress: () => deleteUser(item._id) }
                  ])
                }
              >
                <Text style={styles.crudButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.crudAddButton}
        onPress={() => navigation.navigate('AjouterRh')}
      >
        <Text style={styles.crudAddButtonText}>Ajouter un RH</Text>
      </TouchableOpacity>
    </View>
  );
}
