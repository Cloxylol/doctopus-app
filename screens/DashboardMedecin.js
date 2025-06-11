import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from '../config';


export default function DashboardMedecin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableau de bord - Médecin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' }
});
