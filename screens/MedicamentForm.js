import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { API_URL } from '../config';
import * as ImagePicker from 'expo-image-picker';

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
        <View style={styles.container}>
            <Text style={styles.title}>
                {isEdition ? 'Modifier un médicament' : 'Ajouter un médicament'}
            </Text>

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

            <Button title="Prendre une photo" onPress={pickImage} />
            {(imageUri || photoBase64) && (
                <Image
                    source={{ uri: imageUri || photoBase64 }}
                    style={{ width: 100, height: 100, marginVertical: 10 }}
                    resizeMode="contain"
                />
            )}

            <Button title={isEdition ? 'Enregistrer les modifications' : 'Ajouter'} onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, marginTop: 40 },
    title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold' },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 6,
        backgroundColor: '#fff'
    }
});
