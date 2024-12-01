import { View, TouchableHighlight, Image } from "react-native"
import { useState, useCallback } from "react";
import Header from "../../components/Header"
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ListagemPost from "../../components/ListagemPost";
import axios from 'axios'
import { StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '@env';

const Postagens = () => {
    const navigation = useNavigation();
    const [dadosPost, setDadosPost] = useState([])

    useFocusEffect(
      useCallback(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get(`${BASE_URL}/api/postagens`)
            setDadosPost(res)
          }catch(error){
            console.log(error)
          }
        }
  
        fetchPosts()
  
      }, )
    );
  
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0'); 
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear(); 
    
      return `${day}/${month}/${year}`; 
    }

    function addPost(){
      navigation.navigate('NewPost')
    }

    return(
      <>
       <FlatList
            ListHeaderComponent={<Header titulo={'Controle de Postagens'}/>}
            keyExtractor={item => item.id}
            data={dadosPost.data}
            renderItem={({item}) => <ListagemPost id={item.id} titulo={item.titulo}  data={formatDate(item.createdAt)} autor={item.autor}/>}
            />

            <TouchableHighlight onPress={addPost}>
                <View style={styles.btnNovoPost}>
                    <Image style={styles.icon} source={(require('../../assets/icons/addPost.png'))}/>
                </View>
            </TouchableHighlight>
      </>
    )
}

const styles = StyleSheet.create({
    btnNovoPost:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon:{
        width: 35,
        height: 35
    }
})

export default Postagens