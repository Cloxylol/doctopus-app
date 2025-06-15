import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    FlatList,
    Alert,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ModalModifierTraitement({
    visible,
    onClose,
    patient,
    navigation,
    onTraitementModifie, 
}) {
    const [medicaments, setMedicaments] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        if (visible) {
            fetchMedicaments();
            setSelectedIds(patient.medicaments?.map((m) => m._id || m) || []);
        }
    }, [visible]);

    const fetchMedicaments = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await fetch(`${API_URL}/medicaments`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setMedicaments(data);
        } catch (err) {
            console.error('Erreur chargement médicaments :', err);
            Alert.alert('Erreur', 'Impossible de charger les médicaments');
        }
    };

    const toggleSelection = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const submit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${API_URL}/patients/${patient._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    medicaments: selectedIds,
                }),
            });

            if (!response.ok) {
                const errorMsg = await response.text();
                console.error("Erreur de l'API :", errorMsg);
                Alert.alert('Erreur', 'Échec de la modification.');
                return;
            }

            Alert.alert('Succès', 'Traitement mis à jour !');
            onTraitementModifie(); // ← appel ici pour recharger les patients
        } catch (err) {
            console.error('Erreur réseau :', err);
            Alert.alert('Erreur', 'Connexion au serveur impossible.');
        }
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>🩺 Sélectionner le traitement</Text>

                    <FlatList
                        data={medicaments}
                        keyExtractor={(item) => item._id}
                        style={styles.list}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => toggleSelection(item._id)}
                                style={[
                                    styles.medicamentItem,
                                    selectedIds.includes(item._id) && styles.selectedItem,
                                ]}
                            >
                                <Text style={styles.medicamentText}>{item.nom}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity
                        style={[styles.button, styles.addButton]}
                        onPress={() => {
                            onClose();
                            navigation.navigate('AjoutMedicament');
                        }}
                    >
                        <Text style={styles.buttonText}>➕ Ajouter un médicament</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.validateButton]} onPress={submit}>
                        <Text style={styles.buttonText}>✅ Valider</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                        <Text style={styles.buttonText}>❌ Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(231, 231, 231, 0.86)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '85%',
        backgroundColor: '#fefefe',
        borderRadius: 20,
        padding: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    list: {
        maxHeight: 200,
        marginBottom: 15,
    },
    medicamentItem: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        marginVertical: 5,
    },
    selectedItem: {
        backgroundColor: 'rgba(34, 163, 202, 0.86)',
    },
    medicamentText: {
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#f48fb1',
    },
    validateButton: {
        backgroundColor: '#80cbc4',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
});
