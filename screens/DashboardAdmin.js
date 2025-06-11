import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';



export default function DashboardAdmin({ navigation }) {
  const [medecins, setMedecins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMedecins = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.191:3000/medecins');
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
      await fetch(`http://192.168.1.191:3000/medecins/${id}`, {
        method: 'DELETE',
      });
      fetchMedecins();
    } catch (error) {
      console.error('Erreur suppression :', error);
    }
  };

  useFocusEffect(
  useCallback(() => {
    fetchMedecins();
  }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Médecins</Text>

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
              <Button title="Supprimer" onPress={() => deleteMedecin(item._id)}/>
              <Button title="Modifier" onPress={() => navigation.navigate('ModifierMedecin', { medecin: item })}/>

            </View>
          )}
        />
      )}

      <Button title="Ajouter un médecin" onPress={() => navigation.navigate('AjouterMedecin')}
/>

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
