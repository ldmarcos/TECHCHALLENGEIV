import { FlatList } from 'react-native';
import HeaderHome from '../../components/HeaderHome';
import PostList from '../../components/PostList';
import { useCallback, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '@env';
import axios from 'axios';

const Home = () => {
  const [dadosPost, setDadosPost] = useState([]);
  const [search, setSearch] = useState('');

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        try {
          const url = `${BASE_URL}/api/postagens`
          const res = await axios.get(url);
          setDadosPost(res.data);
        } catch (error) {
          console.log('Erro ao buscar postagens:', error);
        }
      };

      fetchPosts();
      return () => {};
    },[]) 
  );

  useEffect(()=>{
    if (typeof search !== 'string' || search.trim() === '') return;
    const fetchPesquisa = async () => {
      try {
        const url = `${BASE_URL}/api/postagens/search?pesquisa=${search}`
        const res = await axios.get(url);
        setDadosPost(res.data);
      } catch (error) {
        console.log('Erro ao buscar postagens:', error);
      }
    };

    fetchPesquisa();
  },[search])

  const handleSearch = async (text) => {
    setSearch(text);
  
    try {
      const url = text.trim() === ''
        ? `${BASE_URL}/api/postagens`
        : `${BASE_URL}/api/postagens/search?pesquisa=${text}`;
      const res = await axios.get(url);
      setDadosPost(res.data);
    } catch (error) {
      console.log('Erro ao buscar postagens:', error);
    }
  };

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
      ListHeaderComponent={
        <HeaderHome 
          titulo="Bem Vindo ao Blog" 
          search={search} 
          setSearch={handleSearch} 
        />
      }
      keyExtractor={item => String(item.id)} 
      data={dadosPost} 
      renderItem={({ item }) => (
        <PostList
          id={item.id}
          titulo={item.titulo}
          conteudo={stripHtmlTags(item.conteudo.slice(0, 70)) + '...'}
          data={formatDate(item.createdAt)}
          autor={item.autor}
          capa={item.img}
          search={search}
        />
      )}
    />
  );
};

export default Home;
