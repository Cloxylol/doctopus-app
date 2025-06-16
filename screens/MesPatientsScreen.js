import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
import { useIsFocused } from '@react-navigation/native';
import ModalModifierTraitement from './ModalModifierTraitement';
import styles from './styles/screen.styles';

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
      console.log('Bearer Token récupéré :', token);

      const res = await fetch(`${API_URL}/medecins/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      console.log('DATA REÇUE DE /medecins/me :', data);

      if (data.patients && Array.isArray(data.patients)) {
        setPatients(data.patients);
      } else {
        setPatients([]);
      }
    } catch (error) {
      console.error('Erreur chargement patients médecin :', error);
      Alert.alert('Erreur', 'Impossible de charger les patients');
    }
  };

  const filteredPatients = patients.filter((p) =>
    `${p.nom} ${p.prenom}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.crudCard}>
      <Text style={styles.crudTitle}>{item.nom} {item.prenom}</Text>
      <Text style={styles.crudSubtext}>Âge : {item.age} ans</Text>
      <Text style={styles.crudSubtext}>Poids : {item.poids} kg</Text>
      <Text style={styles.crudSubtext}>Taille : {item.taille} cm</Text>

      <Text style={[styles.crudSubtext, { fontWeight: 'bold', marginTop: 6 }]}>Médicaments :</Text>
      {item.medicaments && item.medicaments.length > 0 ? (
        item.medicaments.map((med) => (
          <Text key={med._id || med} style={[styles.crudSubtext, { marginLeft: 10 }]}>
            • {med.nom || 'Médicament inconnu'}
          </Text>
        ))
      ) : (
        <Text style={[styles.crudSubtext, { marginLeft: 10, fontStyle: 'italic' }]}>Aucun médicament</Text>
      )}

      <View style={styles.crudActions}>
        <TouchableOpacity
          style={styles.crudButton}
          onPress={() => {
            setSelectedPatient(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.crudButtonText}>Modifier traitement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.crudButton}
          onPress={() => navigation.navigate('AjoutRdv', { patient: item })}
        >
          <Text style={styles.crudButtonText}>Prendre RDV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/doctopus-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Mes Patients</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un patient..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredPatients.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20, fontStyle: 'italic' }}>
          Aucun patient trouvé.
        </Text>
      )}

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
          setRefreshKey((prev) => prev + 1);
          setModalVisible(false);
        }}
      />
    </View>
  );
}
