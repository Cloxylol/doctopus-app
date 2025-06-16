import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function ModifierPatientForm({ route, navigation }) {
  const { patient } = route.params;

  const [nom, setNom] = useState(patient.nom);
  const [prenom, setPrenom] = useState(patient.prenom);
  const [age, setAge] = useState(String(patient.age));
  const [poids, setPoids] = useState(String(patient.poids));
  const [taille, setTaille] = useState(String(patient.taille));
  const [medicaments, setMedicaments] = useState(patient.medicaments || []);
  const [email, setEmail] = useState(patient.email || '');
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const userRaw = await AsyncStorage.getItem('user');
        const user = JSON.parse(userRaw);
        setRole(user?.role);
      } catch (err) {
        console.error('Erreur récupération rôle :', err);
      }
    };
    fetchRole();
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
            taille: parseFloat(taille),
            medicaments: []
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
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/rh-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Formulaire - Modifier Patient</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} keyboardShouldPersistTaps="handled">
        <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
        <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
        <TextInput style={styles.input} placeholder="Âge" value={age} onChangeText={setAge} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Poids (kg)" value={poids} onChangeText={setPoids} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Taille (cm)" value={taille} onChangeText={setTaille} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />

        <TouchableOpacity style={styles.crudAddButton} onPress={handleUpdate}>
          <Text style={styles.crudAddButtonText}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
