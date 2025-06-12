import React from 'react';
import styles from './styles/screen.styles';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default function AccueilScreen({ route, navigation }) {
  const { role } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/doctopus-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>DOCTOPUS</Text>
      </View>

      {(role === 'ADMIN' || role === 'RH') && (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Rh')}>
          <View style={styles.cardContent}>
            <Image source={require('../assets/rh-logo.png')} style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>Doctopus</Text>
              <Text style={styles.cardSubtitle}>Espace RH</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {(role === 'ADMIN' || role === 'MEDECIN') && (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Medecin')}>
          <View style={styles.cardContent}>
            <Image source={require('../assets/doc-logo.png')} style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>Doctopus</Text>
              <Text style={styles.cardSubtitle}>Espace Médecin</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {role === 'ADMIN' && (
        <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('Admin')}>
          <Text style={styles.adminText}>Administration</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

