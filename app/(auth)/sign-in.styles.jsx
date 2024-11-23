import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#2579E7'
    },
    telaLogin: {
        flex: 1,
        backgroundColor: '#2579E7',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },

    inputsContainer:{
        width:'70%',
        height: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    inputs:{
        backgroundColor: 'white',
        borderRadius: 5,
        height: '35%',
        padding: '5px',
        fontSize: 17
    },

    button:{
        width: '50%',
        borderRadius: 10,
        backgroundColor: '#FBED51',
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    text:{
        fontSize: 20
    },

    textTitulo:{
        fontSize: 20,
        color: 'white'
    }
});


export default styles