import React, { createContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
export const AuthContext = createContext({});
import axios from 'axios'

function AuthProvider({children}){

  const [token, setToken] = useState()
  const [userEmail, setUserEmail] = useState()
  const [userNome, setUserNome] = useState()
  const navigation = useNavigation();

  async function signIn(email, password){
      const url = 'http://192.168.15.7:3000/api/usuarios/login'

      try{
        const login = await axios.post(url, {
          email: email,
          senha: password
        })
        setToken(login.data.token)
        setUserEmail(login.data.email)
        setUserNome(login.data.nome)
        navigation.navigate("Home")
      }catch(error){
        if (error.response && error.response.status === 401) {
          Alert.alert(
            "Erro de Login",
            "Usuário ou senha inválidos",
            [
              { text: "OK", onPress: () => navigation.navigate("Login") }
            ]
          );
        } else {
          Alert.alert(
            "Erro",
            "Houve um problema ao tentar se conectar. Tente novamente mais tarde.",
            [
              { text: "OK" }
            ]
          );
        }
      }
      
      
  }


  return(
    <AuthContext.Provider value={{signIn, token, setToken, userEmail, setUserEmail, userNome, setUserNome}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;