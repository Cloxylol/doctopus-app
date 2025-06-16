import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { API_URL } from '../config';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles/screen.styles';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function AjoutPatientForm({ navigation }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [age, setAge] = useState('');
  const [poids, setPoids] = useState('');
  const [taille, setTaille] = useState('');
  const [email, setEmail] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [medecins, setMedecins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`${API_URL}/medecins`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setMedecins(data);

        const formatted = data.map((m) => ({
          label: `${m.nom} (${m.specialite})`,
          value: m._id
        }));
        setItems(formatted);
      } catch (err) {
        console.error('Erreur chargement médecins :', err);
        Alert.alert('Erreur', 'Impossible de charger les médecins');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!nom || !prenom || !age || !poids || !taille || !email || !value) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          age: parseInt(age),
          poids: parseFloat(poids),
          taille: parseFloat(taille),
          medecinId: value
        })
      });

      if (response.ok) {
        Alert.alert('Succès', 'Patient ajouté');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (error) {
      console.error('Erreur ajout patient :', error);
      Alert.alert('Erreur réseau', 'Connexion au serveur impossible');
    }
  };

  return (
  <View style={styles.crudContainer}>
    <View style={styles.header}>
      <Image source={require('../assets/rh-logo.png')} style={styles.logo} />
      <Text style={styles.headerText}>Formulaire - Patient</Text>
    </View>

    <KeyboardAvoidingView
      style={styles.formContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
      <TextInput style={styles.input} placeholder="Âge" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Poids (kg)" value={poids} onChangeText={setPoids} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Taille (cm)" value={taille} onChangeText={setTaille} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Médecin référent :</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Sélectionner un médecin"
        style={styles.dropdown}
        dropDownContainerStyle={{ borderColor: '#ccc' }}
        zIndex={1000}
      />

      <TouchableOpacity style={styles.crudAddButton} onPress={handleSubmit}>
        <Text style={styles.crudAddButtonText}>Ajouter</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  </View>
);
}
