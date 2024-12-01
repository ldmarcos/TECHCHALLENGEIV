import { View, Text, Button, StyleSheet, TextInput } from "react-native"
import { SafeAreaView } from "react-native"
import Header from "../../components/Header"
import {AuthContext} from '../../context/AuthContext'
import { useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signIn} = useContext(AuthContext)

    async function handleLogin(){
        const login = await signIn(email, password)
        navigation.navigate("Home")
        return login
    }
    const navigation = useNavigation()
    return(
        <SafeAreaView style={styles.safeArea}>
           <Header titulo={'Login'}/> 
           <View style={styles.container}>
                <Text style={styles.text}>Faça seu Login</Text>
                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.inputs}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Digite seu e-mail"
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.inputs}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Digite sua senha"
                    />
                </View>
    
                <View style={styles.botao}>
                    <Button 
                    style={styles.btnLogout}
                    title="Acessar"
                    color="green"
                    onPress={handleLogin}
                    />
                </View>
           </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container:{
        width: '100%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text:{
        fontSize:20,
        marginBottom: 10
    },

    inputsContainer:{
        width:'80%',
        height: '40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: 20
    },

    inputs:{
        backgroundColor: 'white',
        borderRadius: 10,
        height: '35%',
        padding: 5,
        fontSize: 17
    },

    botao:{
        width: '80%',
    },
});


export default Login