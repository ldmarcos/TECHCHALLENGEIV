import { View, Text } from "react-native"
import { StyleSheet } from "react-native"
const HeaderUsers = () =>{

    return(
        <View style={styles.container}>
            <Text style={styles.texto}>Nome</Text>
            <Text style={styles.texto}>E-mail</Text>
            <Text style={styles.texto}>Ações</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        width: '100vw',
        height: 40,
        backgroundColor: '#F7F08E',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },

    texto:{
        fontWeight: '800',
        color: 'black'
    }
})

export default HeaderUsers