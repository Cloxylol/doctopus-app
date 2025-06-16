import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#94D5D0',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#94D5D0',
        borderRadius: 10,
        marginTop: 20,
        padding: 15,
        width: '80%',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    cardTitle: {
        fontWeight: 'bold',
        color: 'white',
    },
    cardSubtitle: {
        color: 'white',
    },
    adminButton: {
        backgroundColor: '#FFBDBD',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 30,
    },
    adminText: {
        color: 'white',
        fontWeight: 'bold',
    },
    
    crudContainer: {
    flex: 1,
    backgroundColor: '#E6E6E6',

    },

    crudCard: {
    backgroundColor: '#94D5D0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    },
  crudTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
  crudSubtext: {
    color: '#f1f1f1',
  },
  crudActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  crudButton: {
    backgroundColor: '#FFBDBD',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  crudButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
    searchBar: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    crudAddButton: {
        backgroundColor: '#94D5D0',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginVertical: 20,
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    crudAddButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    formContainer: {
  paddingHorizontal: 20,
  paddingTop: 20,
},

input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  marginBottom: 15,
  backgroundColor: '#fff',
  fontSize: 16,
},

label: {
  fontWeight: 'bold',
  marginTop: 15,
  marginBottom: 5,
},

checkboxContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
dropdown: {
  marginBottom: 20,
  borderColor: '#ccc',
  zIndex: 1000,
},

imagePreview: {
  width: 150,
  height: 150,
  borderRadius: 10,
  marginTop: 15,
  alignSelf: 'center',
},

});
