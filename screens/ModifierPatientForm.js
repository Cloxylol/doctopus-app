import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '../config';

export default function ModifierPatientForm({ route, navigation }) {
  const { patient } = route.params;

  const [nom, setNom] = useState(patient.nom);
  const [prenom, setPrenom] = useState(patient.prenom);
  const [age, setAge] = useState(String(patient.age));
  const [poids, setPoids] = useState(String(patient.poids));
  const [taille, setTaille] = useState(String(patient.taille));
  const [medicaments, setMedicaments] = useState(patient.medicaments || []);
  const [email, setEmail] = useState(patient.email || '');
  const [listeMedicaments, setListeMedicaments] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRaw = await AsyncStorage.getItem('user');
        const user = JSON.parse(userRaw);
        setRole(user?.role);

        if (user?.role === 'MEDECIN') {
          const token = await AsyncStorage.getItem('token');
          const res = await fetch(`${API_URL}/medicaments`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          setListeMedicaments(data);
        }
      } catch (err) {
        console.error('Erreur chargement données :', err);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const body = role === 'MEDECIN'
        ? { medicaments }
        : {
            nom,
            prenom,
            email,
            age: parseInt(age),
            poids: parseFloat(poids),
            taille: parseFloat(taille)
          };

      const response = await fetch(`${API_URL}/patients/${patient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        Alert.alert('Succès', 'Patient modifié');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (error) {
      console.error('Erreur modif patient :', error);
      Alert.alert('Erreur réseau', 'Connexion au serveur impossible');
    }
  };

  if (!role) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un Patient</Text>

        <>
          <TextInput style={styles.input} value={nom} onChangeText={setNom} placeholder="Nom" />
          <TextInput style={styles.input} value={prenom} onChangeText={setPrenom} placeholder="Prénom" />
          <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Âge" keyboardType="numeric" />
          <TextInput style={styles.input} value={poids} onChangeText={setPoids} placeholder="Poids (kg)" keyboardType="numeric" />
          <TextInput style={styles.input} value={taille} onChangeText={setTaille} placeholder="Taille (cm)" keyboardType="numeric" />
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
        </>

      <Button title="Enregistrer les modifications" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 6 },
  label: { fontWeight: 'bold', marginBottom: 5 },
  selectedMedicament: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 8,
    marginBottom: 6,
    borderRadius: 6,
  },
  selectedText: {
    flex: 1,
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
    marginLeft: 10,
  },
});
