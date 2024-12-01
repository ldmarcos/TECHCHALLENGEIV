import React, { useContext, useEffect, useState } from "react";
import {View,Pressable, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, Keyboard } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import axios from 'axios'
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { useForm, Controller, reset} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BASE_URL } from '@env';

const schema = yup.object({
  titulo: yup.string().required("Informe um titulo"),
  autor: yup.string().required("Informe um autor"),
  capaURL: yup.string().required("Insira uma url para a capa")
})

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;

const EditPost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const richText = React.useRef();
  const [titulo, setTitulo] = useState('');
  const [capa, setCapa] = useState('');
  const [autor, setAutor] = useState('');
  const [conteudo, setConteudo] = useState('');
  const {token} = useContext(AuthContext);

  useEffect(()=>{
    async function fetchData(){
      const url = `${BASE_URL}/api/postagens/${route.params.idPost}`
      try{
        const resposta = await axios.get(url)
        setTitulo(resposta.data.titulo)
        setAutor(resposta.data.autor)
        setCapa(resposta.data.img)
        setConteudo(resposta.data.conteudo)

        reset({
          titulo: resposta.data.titulo,
          autor: resposta.data.autor,
          capaURL: resposta.data.img,
        });

      }catch(error){
        console.log(error)
      }

    }
    fetchData()

  },[])

  const {control, handleSubmit, formState:{errors}, reset} = useForm({
    resolver: yupResolver(schema),
    defaultValues:{
      titulo: titulo,
      autor: autor,
      capa: capa
    }
  })

  async function editarPost(data){
    const url = `${BASE_URL}/api/postagens/${route.params.idPost}`
    try{
      const postagem = await axios.put(
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

  const handlePublicacao = async (data) =>{
    editarPost(data)
    navigation.navigate("Postagens")
  }

  const handleCancelar = () =>{
    navigation.navigate("Postagens")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <View>
                <Text style={styles.titulo}>Editar Postagem</Text>
            </View>
            <View style={styles.botoes}>
                <Pressable style={styles.btnPublicar} onPress={handleSubmit(handlePublicacao)}>
                    <Text style={styles.textBotao}>Salvar</Text>
                </Pressable>
                <Pressable  style={styles.btnCancelar} onPress={handleCancelar}>
                    <Text style={styles.textBotao}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
        <Text style={styles.labels}>Titulo:</Text>
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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          <RichEditor
            ref={richText}
            style={{ padding: 5, minHeight: 300}}
            initialContentHTML={conteudo}
            onChange={(descriptionText) => {
              setConteudo(descriptionText);
            }}
          />
        </ScrollView>
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
        padding: 7
    },

    labels:{
      fontSize: 17,
      fontWeight: '700',
      color: '#2579E7',
    },

    labelError:{
      alignSelf: 'flex-start',
      color: '#ff375b',
      marginBottom: 8
    }
})

export default EditPost;
