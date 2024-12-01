import { View, Text, Button, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native"
import Header from "../../components/Header"
import {AuthContext} from '../../context/AuthContext'
import { useContext } from "react"
const Perfil = () => {

    const {setToken, userEmail, setUserEmail, userNome, setUserNome} = useContext(AuthContext)

    function handleLogout(){
        setToken(undefined)
        setUserEmail('')
        setUserNome('')
    }
    
    return(
        <SafeAreaView>
           <Header titulo={'Perfil'}/> 
           <View style={styles.container}>
            <View style={styles.textos}>
                <Text style={styles.nome}>{userNome}</Text>
                <Text style={styles.email}>{userEmail}</Text>
            </View>
            <View style={styles.botao}>
                <Button 
                style={styles.btnLogout}
                title="Logout"
                color="darkred"
                onPress={handleLogout}
            />
            </View>
           </View> 
        </SafeAreaView>
    )
}

export default Perfil

const styles = StyleSheet.create({

    container:{
        width: '100%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textos:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 500,
        padding: 10
    },

    botao:{
        width: '70%',
    },

    email:{
        fontSize: 15,
        fontWeight: '700'
    },

    nome:{
        marginTop: 15,
        fontSize: 20,
        fontWeight: '700',
        color: '#2579E7'
    }
})