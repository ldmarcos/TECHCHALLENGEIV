import { View, Text, SafeAreaView, Image, StyleSheet, Pressable, TextInput, KeyboardAvoidingView} from "react-native"
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import { useForm, Controller, reset} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BASE_URL } from '@env';

const schema = yup.object({
    nome: yup.string().required("Informe um nome"),
    email: yup.string().required("Informe um e-mail"),
    senha: yup.string().required("Insira uma senha válida")
})

const EditDocente = () =>{
    const navigation = useNavigation()
    const route = useRoute();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const {token} = useContext(AuthContext);


    useEffect(()=>{
        async function fetchData(){
          const url = `${BASE_URL}/api/usuarios/${route.params.idUser}`
          try{
            const resposta = await axios.get(url)
            setNome(resposta.data.nome)
            setEmail(resposta.data.email)

            reset({
              nome: resposta.data.nome,
              email: resposta.data.email,
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
          nome: nome,
          email: email,
        }
      })

      async function editarDocente(data){
        console.log(data)
        const url = `${BASE_URL}/api/usuarios/${route.params.idUser}`
        try{
          const usuario = await axios.put(
            url,
            {
              nome: data.nome,
              email: data.email,
              senha: data.senha
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          return usuario
        }catch(error){
          console.log(error)
        }
      }

    const handleEdicao = (data) =>{
        editarDocente(data)
        navigation.navigate('Usuarios')
    }

    const handleCancelar = () =>{
        navigation.navigate('Usuarios')
    }

    return(
        <SafeAreaView style={styles.containerPagina}>
            <View>
                <Text style={styles.titulo}>Editar Docente</Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.circuloIcon}>
                    <Image style={styles.icon} source={(require('../../assets/icons/docente.png'))}/>
                </View>  
            </View>
            <KeyboardAvoidingView style={styles.containerInput} behavior="position" enabled>
                <Text style={styles.labels}>Nome:</Text>
                <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={[styles.input,
                        {
                        borderColor: errors.nome ? '#ff375b' : '#000'
                        }
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe seu nome"
                    />
                )}
                />
                {errors.nome && <Text style={styles.labelError}>{errors.nome?.message}</Text>}

                <Text style={styles.labels}>E-mail:</Text>
                <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={[styles.input,
                        {
                        borderColor: errors.email ? '#ff375b' : '#000'
                        }
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe seu e-mail"
                    />
                )}
                />
                {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

                <Text style={styles.labels}>Senha</Text>
                <Controller
                control={control}
                name="senha"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={[styles.input,
                        {
                        borderColor: errors.senha ? '#ff375b' : '#000'
                        }
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Insira uma senha"
                    secureTextEntry={true}
                    />
                )}
                />
                 {errors.senha && <Text style={styles.labelError}>{errors.senha?.message}</Text>}
            </KeyboardAvoidingView>
            <View style={styles.botoes}>
                <Pressable style={styles.btnSalvar} onPress={handleSubmit(handleEdicao)}>
                    <Text style={styles.textBotao}>Salvar</Text>
                </Pressable>
                <Pressable  style={styles.btnCancelar} onPress={handleCancelar}>
                    <Text style={styles.textBotao}>Cancelar</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    containerPagina:{
        flex: 1,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },

    titulo:{
        fontSize: 35,
        fontWeight: '700',
        color: '#2579e7',
    },

    iconContainer:{
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circuloIcon:{
        borderWidth: 2,
        borderColor: '#2579e7',
        width: 190,
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },

    icon:{
        width: 100,
        height: 100
    },

    labels:{
        fontSize: 22,
        color:'#2579e7',
        fontWeight: '700',
        marginBottom: 5,
        marginTop: 20
    },

    input:{
        borderWidth: 1,
        fontSize: 17,
        height: 55,
        borderRadius: 10,
        padding: 5,
    },

    botoes:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
    },

    btnSalvar:{
        width: '40%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'green'
    },

    btnCancelar:{
        width: '40%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'red'
    },

    textBotao:{
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },

    labelError:{
        color: 'red'
    },

    containerInput:{
        marginTop: 50
    }
})

export default EditDocente