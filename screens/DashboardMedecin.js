import React from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles/screen.styles';

export default function DashboardMedecin({ navigation }) {
return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/doc-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Dashboard Médecin</Text>
      </View>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListeMedicaments')}>
        <View style={styles.cardContent}>
          <Image source={require('../assets/medicament-logo.png')} style={styles.cardIcon} />
          <View>
            <Text style={styles.cardTitle}>Médicaments</Text>
            <Text style={styles.cardSubtitle}>Gérer les médicaments</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MesPatients')}>
        <View style={styles.cardContent}>
          <Image source={require('../assets/patient-logo.png')} style={styles.cardIcon} />
          <View>
            <Text style={styles.cardTitle}>Patients</Text>
            <Text style={styles.cardSubtitle}>Voir la liste de mes patients</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
