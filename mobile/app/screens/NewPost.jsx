import React, { useContext, useEffect, useState } from "react";
import {View,Pressable, Text, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BASE_URL } from '@env';

const schema = yup.object({
  titulo: yup.string().required("Informe um titulo"),
  autor: yup.string().required("Informe um autor"),
  capaURL: yup.string().required("Insira uma url para a capa")
})

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;

const NewPost = () => {
  const navigation = useNavigation()
  const {token} = useContext(AuthContext)
  const richText = React.useRef();
  const [conteudo, setConteudo] = useState('')

  const {control, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  })

  async function publicarPost(data){
    const url = `${BASE_URL}/api/postagens`
    try{
      const postagem = await axios.post(
        url,
        {
          titulo: data.titulo,
          img: data.capaURL,
          conteudo: conteudo,
          autor: data.autor,
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
  }

  const handlePublicacao = (data) =>{
    publicarPost(data)
    navigation.navigate('Postagens')
  }

  const handleCancelar = () =>{
    navigation.navigate('Postagens')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <View>
                <Text style={styles.titulo}>Novo Post</Text>
            </View>
            <View style={styles.botoes}>
                <Pressable style={styles.btnPublicar} onPress={handleSubmit(handlePublicacao)}>
                    <Text style={styles.textBotao}>Publicar</Text>
                </Pressable>
                <Pressable  style={styles.btnCancelar} onPress={handleCancelar}>
                    <Text style={styles.textBotao}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
        <Text style={styles.labels}>Título:</Text>
        <Controller
          control={control}
          name="titulo"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input,
                {
                  borderColor: errors.titulo ? '#ff375b' : '#000'
                }
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Informe o título"
            />
          )}
        />
        {errors.titulo && <Text style={styles.labelError}>{errors.titulo?.message}</Text>}

        <Text style={styles.labels}>Autor:</Text>
        <Controller
          control={control}
          name="autor"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input,
                {
                  borderColor: errors.autor ? '#ff375b' : '#000'
                }
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Informe o autor"
            />
          )}
        />
        {errors.autor && <Text style={styles.labelError}>{errors.autor?.message}</Text>}

        <Text style={styles.labels}>Capa URL:</Text>
        <Controller
          control={control}
          name="capaURL"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input,
                {
                  borderColor: errors.capaURL ? '#ff375b' : '#000'
                }
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Insira a URL da capa"
            />
          )}
        />
        {errors.capaURL && <Text style={styles.labelError}>{errors.capaURL?.message}</Text>}

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
        actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertOrderedList, actions.insertBulletsList
        ]}
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
        padding: 7,
    },

    labels:{
      fontSize: 17,
      fontWeight: '700',
      color: '#2579E7'
    },

    labelError:{
      alignSelf: 'flex-start',
      color: '#ff375b',
      marginBottom: 8
    }
})

export default NewPost;
