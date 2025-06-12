import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function DashboardMedecin({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Espace Médecin</Text>
      <Button title="Voir les médicaments" onPress={() => navigation.navigate('ListeMedicaments')} />
      <View style={{ marginTop: 20 }}>
        <Button title="Voir mes patients" onPress={() => navigation.navigate('MesPatients')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
});
