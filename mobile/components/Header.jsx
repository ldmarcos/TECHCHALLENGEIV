import { View, Image, Text, TextInput } from "react-native"
import { StyleSheet } from "react-native"

const Header = ({titulo}) => {
    return(
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <Image style={styles.img} source={require('../assets/images/logo.png')}/>
                <Text style={styles.tituloPagina}>{titulo}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    headerContainer:{
        width: '100vw',
        height: 120,
        backgroundColor: '#2579E7', 
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },

    header:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',
        gap: 10
    },

    tituloPagina:{
        fontSize: 25,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center'
    },

    img:{
        width: 76,
        height: 70,
    }
})

export default Header