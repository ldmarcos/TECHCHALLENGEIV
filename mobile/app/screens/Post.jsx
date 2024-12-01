import { useRoute } from "@react-navigation/native";
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Capa from "../../components/Capa";
import { useNavigation } from 'expo-router';
import axios from 'axios';
import WebView from "react-native-webview";
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Dimensions } from 'react-native'
import { BASE_URL } from '@env';
const Post = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [dadosPost, setDadosPost] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/postagens/${route.params.id}`);
                setDadosPost(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, [route.params.id]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image style={{ height: 20, width: 30 }} source={require('../../assets/icons/backArrow.png')} />
                    </TouchableOpacity>
                    <View style={styles.infoPost}>
                        <Text style={styles.titulo}>{dadosPost.titulo}</Text>
                        <View style={styles.detail}>
                            <Text style={styles.texto}>{formatDate(dadosPost.createdAt)}</Text>
                            <Text style={styles.texto}>{dadosPost.autor}</Text>
                        </View>
                    </View>
                    <Capa fonte={dadosPost.img} />
                </View>
                <View style={styles.postContainer}>
                    <AutoHeightWebView
                        style={{ width: Dimensions.get('window').width - 20}}
                        source={{ html: ` <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Teste WebView</title>
                                    <style>
                                            @font-face {
                                                font-family: 'Charter';
                                                src: local('Charter'), url('https://example.com/path-to-charter.woff2') format('woff2');
                                            }

                                            body {
                                                font-size: 20px;
                                                font-family: 'Charter', Georgia, serif;
                                            }

                                            h1, h2, h3, h4, h5, h6 {
                                                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                                            }
                                    </style>
                                </head>
                                <body>
                                    ${dadosPost.conteudo}
                                </body>
                                </html>` }}
                        scalesPageToFit={true}
                        viewportContent={'width=device-width, user-scalable=no'}
                    />
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default Post;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        padding: 15,
    },

    postContainer:{
        paddingLeft: 10,
        paddingRight: 10,
    },


    infoPost: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    titulo: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 25,
        fontWeight: '900',
        color: '#2579E7',
        textAlign: 'center',
    },

    detail: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    texto: {
        color: '#2579E7',
        fontWeight: '900',
        fontSize: 14,
    },

    conteudo: {
        fontSize: 20,
        marginBottom: 30,
        lineHeight: 30,
        textAlign: 'justify',
    },

});
