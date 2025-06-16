# 🐙 Doctopus

Application mobile de gestion des patients, médecins, RH et rendez-vous, développée avec React Native et Node.js.

## 📱 Présentation

Doctopus est une application fullstack mobile destinée aux établissements de santé. Elle permet aux différents utilisateurs (RH, Médecins, Admin) de gérer :

- Les patients et leurs traitements
- Les utilisateurs avec des rôles sécurisés
- Les rendez-vous (avec ajout dans le calendrier du téléphone)
- Les médicaments (avec ajout de photo via caméra)

## ⚙️ Stack technique

### Frontend
- React Native (avec Expo)
- AsyncStorage (stockage local du token)
- expo-image-picker (prise de photo)
- fetch API sécurisée avec JWT

### Backend
- Node.js + Express
- MongoDB avec Mongoose
- Authentification via JWT
- Sécurité par rôle (`ADMIN`, `RH`, `MEDECIN`)

## 🔐 Authentification et rôles

Chaque utilisateur se connecte via `/auth/login`, et son token JWT contient son rôle.  
Les rôles définissent les accès aux routes et aux écrans :

| Rôle     | Accès                                           |
|----------|--------------------------------------------------|
| ADMIN    | Gestion des utilisateurs, médecins, RH, patients |
| RH       | Création de patients, gestion des fiches         |
| MEDECIN  | Accès à ses patients, traitements, rendez-vous   |

## 🏗 Structure des dossiers

📦 doctopus-app/
├── back-doctopus/ → API Node.js (Express + MongoDB)
├── / → Front mobile React Native

bash
Copier
Modifier


🧠 Auteurs
Florian Dardy & Cloé Petetin
