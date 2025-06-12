import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '../config';

export default function AjoutPatientForm({ navigation }) {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [age, setAge] = useState('');
  const [poids, setPoids] = useState('');
  const [taille, setTaille] = useState('');
  const [medecinId, setMedecinId] = useState('');
  const [medicaments, setMedicaments] = useState([]);
  const [selectedMedicaments, setSelectedMedicaments] = useState([]);
  const [medecins, setMedecins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const [medecinsRes, medicamentsRes] = await Promise.all([
          fetch(`${API_URL}/medecins`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/medicaments`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const medecinsData = await medecinsRes.json();
        const medicamentsData = await medicamentsRes.json();

        setMedecins(medecinsData);
        setMedicaments(medicamentsData);
      } catch (err) {
        console.error('Erreur de chargement :', err);
        Alert.alert('Erreur', 'Impossible de charger les données');
      }
    };

    fetchData();
  }, []);

  const toggleMedicament = (id) => {
    setSelectedMedicaments((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!nom || !prenom || !age || !poids || !taille || !medecinId) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs requis');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nom,
          prenom,
          age: parseInt(age),
          poids: parseFloat(poids),
          taille: parseFloat(taille),
          medicaments: selectedMedicaments,
          medecinId
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ajouter un Patient</Text>

      <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
      <TextInput style={styles.input} placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
      <TextInput style={styles.input} placeholder="Âge" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Poids (kg)" value={poids} onChangeText={setPoids} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Taille (cm)" value={taille} onChangeText={setTaille} keyboardType="numeric" />

      <Text style={styles.label}>Médecin référent :</Text>
      <Picker selectedValue={medecinId} onValueChange={setMedecinId} style={styles.input}>
        <Picker.Item label="Sélectionner un médecin" value="" />
        {medecins.map((m) => (
          <Picker.Item key={m._id} label={`${m.nom} (${m.specialite})`} value={m._id} />
        ))}
      </Picker>

      <Text style={styles.label}>Médicaments :</Text>
      {medicaments.map((medoc) => (
        <View key={medoc._id} style={styles.checkboxContainer}>
          <Text
            style={{
              flex: 1,
              color: selectedMedicaments.includes(medoc._id) ? 'green' : 'black'
            }}
            onPress={() => toggleMedicament(medoc._id)}
          >
            {medoc.nom}
          </Text>
        </View>
      ))}

      <Button title="Ajouter" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6 },
  label: { fontWeight: 'bold', marginVertical: 10 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 }
});
