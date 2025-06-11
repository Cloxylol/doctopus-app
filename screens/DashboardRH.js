import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../config';


export default function DashboardRHAdmin({ navigation }) {
  const [rhUsers, setRhUsers] = useState([]);

  const fetchRH = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      const onlyRH = data.filter(user => user.role === 'RH');
      setRhUsers(onlyRH);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les RH');
    }
  };

  useFocusEffect(useCallback(() => {
    fetchRH();
  }, []));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des RH</Text>

      <FlatList
        data={rhUsers}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.email}>{item.email}</Text>
            <Button title="Modifier" onPress={() => navigation.navigate('ModifierRH', { rh: item })} />
            <Button title="Supprimer" onPress={() => { }} disabled /> {/* à activer plus tard */}
          </View>
        )}
      />

      <Button title="Ajouter un RH" onPress={() => navigation.navigate('AjouterRH')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  card: { marginBottom: 15, padding: 10, backgroundColor: '#eee', borderRadius: 6 },
  email: { fontWeight: 'bold' }
});
