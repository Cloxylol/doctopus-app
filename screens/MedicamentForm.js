import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '../config';
import styles from './styles/screen.styles';

export default function MedicamentForm({ route, navigation }) {
  const medicament = route?.params?.medicament;
  const isEdition = !!medicament;

  const [nom, setNom] = useState(medicament?.nom || '');
  const [posologie, setPosologie] = useState(medicament?.posologie || '');
  const [description, setDescription] = useState(medicament?.description || '');
  const [photoBase64, setPhotoBase64] = useState(medicament?.photoBase64 || null);
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      return Alert.alert("Permission refusée", "Autorisation caméra requise.");
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setImageUri(asset.uri);
      setPhotoBase64(`data:image/jpeg;base64,${asset.base64}`);
    }
  };

  const handleSubmit = async () => {
    if (!nom || !posologie || !description) {
      return Alert.alert('Erreur', 'Tous les champs sont requis');
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const url = isEdition
        ? `${API_URL}/medicaments/${medicament._id}`
        : `${API_URL}/medicaments`;
      const method = isEdition ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom, posologie, description, photoBase64 })
      });

      if (response.ok) {
        Alert.alert('Succès', isEdition ? 'Médicament modifié' : 'Médicament ajouté');
        navigation.goBack();
      } else {
        const msg = await response.text();
        Alert.alert('Erreur', msg);
      }
    } catch (error) {
      console.error('Erreur réseau :', error);
      Alert.alert('Erreur réseau', 'Impossible de contacter le serveur');
    }
  };

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/doc-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>
          Formulaire - Médicament
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.formContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Nom"
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

        <TouchableOpacity style={styles.secondaryButton} onPress={pickImage}>
          <Text style={styles.secondaryButtonText}>Prendre une photo</Text>
        </TouchableOpacity>

        {(imageUri || photoBase64) && (
          <Image
            source={{ uri: imageUri || photoBase64 }}
            style={styles.imagePreview}
            resizeMode="contain"
          />
        )}

        <TouchableOpacity style={styles.crudAddButton} onPress={handleSubmit}>
          <Text style={styles.crudAddButtonText}>
            {isEdition ? 'Enregistrer les modifications' : 'Ajouter'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
