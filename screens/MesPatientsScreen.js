import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { useIsFocused } from '@react-navigation/native';
import ModalModifierTraitement from './ModalModifierTraitement';


export default function MesPatientsScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);



  useEffect(() => {
    if (isFocused) fetchPatients();
  }, [isFocused]);

  const fetchPatients = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_URL}/medecins/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (data.patients) setPatients(data.patients);
      else setPatients([]);
    } catch (error) {
      console.error('Erreur chargement patients médecin :', error);
      Alert.alert('Erreur', 'Impossible de charger les patients');
    }
  };

  const filteredPatients = patients.filter((p) =>
    `${p.nom} ${p.prenom}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nom}>{item.nom} {item.prenom}</Text>
      <Text>Âge : {item.age} ans</Text>
      <Text>Poids : {item.poids} kg</Text>
      <Text>Taille : {item.taille} cm</Text>

      <Text style={{ fontWeight: 'bold', marginTop: 6 }}>Médicament :</Text>
      {item.medicaments && item.medicaments.length > 0 ? (
        item.medicaments.map((med) => (
          <Text key={med._id || med} style={{ marginLeft: 10 }}>
            • {med.nom || 'Médicament inconnu'}
          </Text>
        ))
      ) : (
        <Text style={{ marginLeft: 10, fontStyle: 'italic' }}>Aucun médicament</Text>
      )}

      <View style={styles.actions}>
        <Button
          title="Modifier traitement"
          onPress={() => {
            setSelectedPatient(item);
            setModalVisible(true);
          }}
        />
        <Button title="Prendre RDV" onPress={() => navigation.navigate('AjoutRdv', { patient: item })} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Patients</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un patient..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredPatients}
        key={refreshKey} 
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

      <ModalModifierTraitement
        visible={modalVisible}
        patient={selectedPatient}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
        onTraitementModifie={() => {
          fetchPatients();
          setRefreshKey(prev => prev + 1);
          setModalVisible(false);
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, backgroundColor: '#eee', borderRadius: 8, marginBottom: 10 },
  nom: { fontWeight: 'bold', fontSize: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  }
});
