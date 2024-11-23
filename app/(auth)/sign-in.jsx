import { View,Image, TextInput, Pressable, Text} from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context' 
import styles from './sign-in.styles'
import {router} from 'expo-router';

const SignIn = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.telaLogin}>
          <Image source={require('../../assets/images/logo.png')}/>
          <Text style={styles.textTitulo}>Seja bem vindo ao nosso app.</Text>
          <View style={styles.inputsContainer}>
            <TextInput style={styles.inputs} placeholder='E-mail'/>
            <TextInput style={styles.inputs} placeholder='Senha'/>
          </View>
          <Pressable onPress={() => router.push('/home')} style={styles.button}>
            <Text style={styles.text}>Entrar</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default SignIn