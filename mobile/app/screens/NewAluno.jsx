import { View, Text, SafeAreaView, Image, StyleSheet, Pressable, TextInput, KeyboardAvoidingView} from "react-native"
import { useForm, Controller} from 'react-hook-form';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as yup from 'yup'
import axios from 'axios'
import { BASE_URL } from '@env';

const schema = yup.object({
    nome: yup.string().required("Informe um nome"),
    email: yup.string().required("Informe um e-mail"),
    senha: yup.string().required("Insira uma senha")
  })

const NewAluno = () =>{
    const navigation = useNavigation()
    const {token} = useContext(AuthContext)
    const route = useRoute()
    async function criarUsuario(data){
        const url = `${BASE_URL}/api/usuarios/signup`
    try{
      const usuario = await axios.post(
        url,
        {
          nome: data.nome,
          email: data.email,
          grupo: route.params.grupo,
          senha: data.senha,
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

    const handleAdicionar = (data) =>{
        criarUsuario(data)
        navigation.navigate('Usuarios')
    }

    const handleCancelar = () =>{
        navigation.navigate('Usuarios')
    }

    const {control, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
      })

    return(
        <SafeAreaView style={styles.containerPagina}>
            <View>
                <Text style={styles.titulo}>Novo Aluno</Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.circuloIcon}>
                    <Image style={styles.icon} source={(require('../../assets/icons/aluno.png'))}/>
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
                        borderColor: errors.titulo ? '#ff375b' : '#000'
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
                        borderColor: errors.autor ? '#ff375b' : '#000'
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
                        borderColor: errors.capaURL ? '#ff375b' : '#000'
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
            </KeyboardAvoidingView>
            <View style={styles.botoes}>
                <Pressable style={styles.btnSalvar} onPress={handleSubmit(handleAdicionar)}>
                    <Text style={styles.textBotao}>Adicionar</Text>
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

    containerInput:{
        marginTop: 50
    }
})

export default NewAluno