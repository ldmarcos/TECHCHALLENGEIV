import { FlatList } from 'react-native';
import HeaderHome from '../../components/HeaderHome';
import PostList from '../../components/PostList';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const Home = () => {
  const [dadosPost, setDadosPost] = useState([])

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        try {
          const res = await axios.get(`http://192.168.15.7:3000/api/postagens`)
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

  const stripHtmlTags = (html) => {
    return html.replace(/<[^>]*>/g, '');
  };


  return (
          <FlatList
            ListHeaderComponent={<HeaderHome titulo={'Bem Vindo, Professor'}/>}
            keyExtractor={item => item.id}
            data={dadosPost.data}
            renderItem={({item}) => <PostList id={item.id} titulo={item.titulo} conteudo={stripHtmlTags(item.conteudo.slice(0,50)) + '...'} data={formatDate(item.createdAt)} autor={item.autor} capa={item.img} />}
          />
  )
}

export default Home
