import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addEventToCalendar } from '../utils/calendarUtils';

export default function AjoutRdvScreen({ route, navigation }) {
  const { patient } = route.params;

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const handleConfirm = async () => {
    try {
      const endDate = new Date(date.getTime() + 30 * 60000); // +30 min
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
    <View style={styles.container}>
      <Text style={styles.title}>Planifier un Rendez-vous</Text>

      <Button title="Choisir une date et heure" onPress={() => setShowPicker(true)} />

      <Text style={styles.date}>
        {date.toLocaleDateString()} à {date.toLocaleTimeString()}
      </Text>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={handleChange}
        />
      )}

      <Button title="Confirmer le Rendez-vous" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 22, marginBottom: 20 },
  date: { marginVertical: 20, fontSize: 16 }
});
