import { View, Text } from "react-native"
import { StyleSheet } from "react-native"
import PopUser from "./PopUser";


const UserList = ({id, nome, email, grupo}) => {
    return(
        <View style={styles.userContainer}>
            <Text style={styles.text}>{nome}</Text>
            <Text style={styles.text}>{email}</Text>
             {<PopUser idUser={id} grupo={grupo}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    userContainer:{
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        padding: 10,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },

    text:{
        fontSize: 16,
        fontWeight: '600'
    },

    btnOptions:{
        width: 40,
        height: 40
    }
})

export default UserList