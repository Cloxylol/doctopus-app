import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addEventToCalendar } from '../utils/calendarUtils';
import styles from './styles/screen.styles';

export default function AjoutRdvScreen({ route, navigation }) {
  const { patient } = route.params;

  const [date, setDate] = useState(new Date());

  const handleChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleConfirm = async () => {
    try {
      const endDate = new Date(date.getTime() + 30 * 60000);
      const title = `Rendez-vous patient ${patient.nom} ${patient.prenom}`;
      const description = `Consultation prévue avec ${patient.nom} ${patient.prenom}`;

      await addEventToCalendar({ title, startDate: date, endDate });

      Alert.alert('Succès', 'Rendez-vous ajouté au calendrier');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Erreur', err.message || 'Impossible d’ajouter le rendez-vous');
    }
  };

  return (
    <View style={styles.crudContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/doctopus-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Rendez-vous</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.label}>Date et heure :</Text>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>
          {date.toLocaleDateString()} à {date.toLocaleTimeString()}
        </Text>

        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={handleChange}
          style={{ marginBottom: 20 }}
        />

        <TouchableOpacity style={styles.crudAddButton} onPress={handleConfirm}>
          <Text style={styles.crudAddButtonText}>Confirmer le rendez-vous</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
