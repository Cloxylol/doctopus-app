import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles/screen.styles';

export default function DashboardAdmin({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/doctopus-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Tableau de bord Administrateur</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminMedecin')}>
          <View style={styles.cardContent}>
            <Image source={require('../assets/doc-logo.png')} style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>Gérer les Médecins</Text>
              <Text style={styles.cardSubtitle}>Ajout, suppression, modification</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminRh')}>
          <View style={styles.cardContent}>
            <Image source={require('../assets/rh-logo.png')} style={styles.cardIcon} />
            <View>
              <Text style={styles.cardTitle}>Gérer les RH</Text>
              <Text style={styles.cardSubtitle}>Gestion des ressources humaines</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
