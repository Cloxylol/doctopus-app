import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AccueilScreen({ route, navigation }) {
  const { role } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Rôle : {role}</Text>

      {role === 'ADMIN' && (
        <>
          <Button title="Dashboard Admin" onPress={() => navigation.navigate('Admin')} />
          <Button title="Dashboard RH" onPress={() => navigation.navigate('Rh')} />
          <Button title="Dashboard Médecins" onPress={() => navigation.navigate('Medecin')} />
        </>
      )}

      {role === 'RH' && (
        <Button title="Dashboard RH" onPress={() => navigation.navigate('Rh')} />
      )}

      {role === 'MEDECIN' && (
        <Button title="Dashboard Médecin" onPress={() => navigation.navigate('Médecin')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, marginBottom: 20 }
});
