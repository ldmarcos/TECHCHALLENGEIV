import React, { useContext, useState} from 'react';
import { View, Image, Text, StyleSheet,Modal,Pressable } from "react-native";
import { useNavigation } from "expo-router";
import axios from 'axios';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '@env';

const Popup = ({ idPost }) => {
    const navigation = useNavigation();
    const {token} = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);
    async function handleDeletePost() {
        const url = `${BASE_URL}/api/postagens/${idPost}`;
        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Post deletado com sucesso:", response.data);
            setModalVisible(!modalVisible)
        } catch (error) {
            console.error("Erro ao deletar o post:", error.message);
        }
    }

    function handleEditPost() {
        navigation.navigate('EditPost', { idPost });
    }

    return (
        <>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Deseja excluir a postagem?</Text>
                    <View style={styles.btnModal}>
                        <Pressable
                            style={[styles.button, styles.buttonDelete]}
                            onPress={handleDeletePost}>
                            <Text style={styles.textStyle}>Sim</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Não</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
          </Modal>

        <Menu>
            <MenuTrigger>
                <Image
                    style={styles.iconTrigger}
                    source={require('../assets/icons/menu.png')}
                />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionsWrapper: {
                        backgroundColor: 'white',
                        borderRadius: 10,
                        left: 10,
                        width: 170,
                        height: 80,
                        borderWidth: 1,
                        borderColor: '#ddd',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        elevation: 5,
                        overflow: 'hidden',
                        position: 'absolute',
                    },
                }}
            >
                <MenuOption onSelect={handleEditPost}>
                    <View style={styles.optionContainer}>
                        <Text style={styles.textEdit}>Editar</Text>
                        <Image
                            style={styles.iconOption}
                            source={require('../assets/icons/pencil.png')}
                        />
                    </View>
                </MenuOption>
                <MenuOption onSelect={()=>setModalVisible(true)}>
                    <View style={styles.optionContainer}>
                        <Text style={styles.textDelete}>Apagar</Text>
                        <Image
                            style={styles.iconOption}
                            source={require('../assets/icons/trash.png')}
                        />
                    </View>
                </MenuOption>
            </MenuOptions>
        </Menu>
        </>
    );
};

const styles = StyleSheet.create({
    containerMenu:{
        borderWidth: 1
    },
    iconTrigger: {
        width: 24,
        height: 34,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30
    },
    iconOption: {
        width: 20,
        height: 20,
    },

    textEdit: {
        fontWeight: '700',
        color: 'black',
    },
    textDelete: {
        fontWeight: '700',
        color: 'red',
    },

    textStyle:{
        color: 'white',
        fontWeight: '600'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:  'rgba(0,0,0,0.6)',
    },
    
    modalView: {
        width: '80%',
        height: '20%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowRadius: 4,
        elevation: 10,
        zIndex: 1
    },

    modalText:{
        fontSize: 17,
        fontWeight: '600'
    },

    btnModal:{
        width: '100%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '40%',
        alignItems: 'center'
      },
      buttonDelete: {
        backgroundColor: 'green',
      },
      buttonClose: {
        backgroundColor: 'red',
      },
});

export default Popup;
