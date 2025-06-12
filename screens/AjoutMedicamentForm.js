import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { API_URL } from '../config';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

export default function AjoutMedicamentForm({ navigation }) {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [posologie, setPosologie] = useState('');
  const [photoBase64, setPhotoBase64] = useState(null);


  const handleSubmit = async () => {
    if (!nom || !description) {
      return Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }

    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch(`${API_URL}/medicaments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom, description, posologie, photoBase64 })
      });

      if (response.ok) {
        Alert.alert('Succès', 'Médicament ajouté');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (error) {
      console.error('Erreur ajout médicament :', error);
      Alert.alert('Erreur réseau', 'Impossible de contacter le serveur');
    }
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      return Alert.alert("Permission refusée", "Autorisation caméra requise.");
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setImage(asset.uri);
      setPhotoBase64(`data:image/jpeg;base64,${asset.base64}`);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un Médicament</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom du médicament"
        value={nom}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Posologie"
        value={posologie}
        onChangeText={setPosologie}
      />

      <Button title="Prendre une photo" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, alignContent: 'center' }} resizeMode="contain" />}

      <Button title="Ajouter" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: '#fff'
  }
});
