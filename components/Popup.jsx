import React from 'react';
import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import axios from 'axios';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

const Popup = ({ idPost }) => {
    const navigation = useNavigation();

    async function handleDeletePost() {
        const url = `http://192.168.15.7:3000/api/postagens/${idPost}`;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMxNzc1MTMwLCJleHAiOjE3MzE3Nzg3MzB9.myarPRk0MQmHoz_A55lvj1_pn8Va3xRW0w5cOxpQsqw';
        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Post deletado com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao deletar o post:", error.message);
        }
    }

    function handleEditPost() {
        navigation.navigate('EditPost', { idPost });
    }

    return (
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
                <MenuOption onSelect={handleDeletePost}>
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
});

export default Popup;
