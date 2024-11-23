import React, { useEffect, useState } from "react";
import {View,Pressable, Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import axios from 'axios'
import { useNavigation } from "expo-router";

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;

const NewPost = () => {
  const navigation = useNavigation()
  const richText = React.useRef();
  const [titulo, setTitulo] = useState('')
  const [capa, setCapa] = useState('')
  const [autor, setAutor] = useState('')
  const [conteudo, setConteudo] = useState('')

  const handlePublicacao = async () =>{
    const url = `http://192.168.15.7:3000/api/postagens`
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMxNzc1MTMwLCJleHAiOjE3MzE3Nzg3MzB9.myarPRk0MQmHoz_A55lvj1_pn8Va3xRW0w5cOxpQsqw'
    
    try{
      const postagem = await axios.post(
        url,
        {
          titulo: titulo,
          img: capa,
          conteudo: conteudo,
          autor: autor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return postagem
    }catch(error){
      console.log(error)
    }
    navigation.goBack()
  }

  const handleCancelar = () =>{
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <View>
                <Text style={styles.titulo}>Novo Post</Text>
            </View>
            <View style={styles.botoes}>
                <Pressable style={styles.btnPublicar} onPress={handlePublicacao}>
                    <Text style={styles.textBotao}>Publicar</Text>
                </Pressable>
                <Pressable  style={styles.btnCancelar} onPress={handleCancelar}>
                    <Text style={styles.textBotao}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
        <Text style={styles.labels}>Titulo:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text)=> setTitulo(text)}
          value={titulo}
        />
        <Text style={styles.labels}>Autor:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text)=> setAutor(text)}
          value={autor}
        />
        <Text style={styles.labels}>Capa Url:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text)=> setCapa(text)}
          value={capa}
        />
        <Text style={styles.labels}>Conteudo:</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, borderWidth: 1, borderRadius: 10, padding: 5, minHeight: 300 }}>  
          <RichEditor
            ref={richText}
            onChange={(descriptionText) => {
              setConteudo(descriptionText || '')
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <RichToolbar
        editor={richText}
        actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1]}
        iconMap={{ [actions.heading1]: handleHead }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container:{
        padding: 10
    },

    header:{
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },

    titulo:{
        fontSize: 25,
        fontWeight: '700',
        color: '#2579E7'
    },
    
    botoes:{
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-end',
        alignItems: 'center',
        gap: 20
    },

    btnPublicar:{
        padding: 8,
        borderRadius: 10,
        backgroundColor: 'green',
    },

    
    btnCancelar:{
        padding: 8,
        borderRadius: 10,
        backgroundColor: 'darkred',
    },

    textBotao:{
        color: 'white'
    },

    input:{
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        marginBottom: 20,
        textAlign: 'left',
        padding: 7
    },

    labels:{
      fontSize: 17,
      fontWeight: '700',
      color: '#2579E7'
    }
})

export default NewPost;
