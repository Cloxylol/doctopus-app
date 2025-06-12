import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6',
        alignItems: 'center',
        paddingTop: 40,
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
});
