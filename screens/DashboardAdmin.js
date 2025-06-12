import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DashboardAdmin({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableau de bord Administrateur</Text>

      <Button title="Gérer les Médecins" onPress={() => navigation.navigate('AdminMedecin')} />
      <Button title="Gérer les RH" onPress={() => navigation.navigate('AdminRh')
} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 }
});
