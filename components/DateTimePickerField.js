import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateTimePickerField({ label, value, onChange }) {
  const [show, setShow] = useState(false);

  const showPicker = () => setShow(true);

  const handleChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios'); // iOS garde le picker affiché
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Button title={value ? value.toLocaleString() : "Choisir une date"} onPress={showPicker} />
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="datetime"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { marginBottom: 8, fontWeight: 'bold' }
});
