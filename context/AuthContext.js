import React, { createContext, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
export const AuthContext = createContext({});
import axios from 'axios'

function AuthProvider({children}){

  const [token, setToken] = useState()
  const navigation = useNavigation();

  async function signIn(email, password){
      const url = 'http://192.168.15.7:3000/api/usuarios/login'
      console.log(password)
      console.log(email)
      
      const login = await axios.post(url, {
        email: email,
        senha: password
      })
      setToken(login.data.token)
      console.log(login.data.token)
      navigation.navigate("Home")
  }


  return(
    <AuthContext.Provider value={{signIn, token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;