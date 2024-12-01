import { View, Text, SafeAreaView, FlatList, TouchableHighlight, StyleSheet, Image } from "react-native"
import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import UserList from "../../components/UserList";
import { useFocusEffect } from "@react-navigation/native";
import HeaderUsers from "../../components/HeaderUsers";
import { BASE_URL } from '@env';

const Docentes = () => {
    const [dadosUser, setDadosUser] = useState([]);
    const {token} = useContext(AuthContext);
    useFocusEffect(
        useCallback(() => {
          const fetchPosts = async () => {
            try {
              const url = `${BASE_URL}/api/usuarios?grupo=Docentes`
              const res = await axios.get(url, {headers:{Authorization: `Bearer ${token}`}});
              setDadosUser(res.data);
            } catch (error) {
              console.log('Erro ao buscar os usuários:', error);
            }
          };
          fetchPosts();
          return () => {};
        }) 
      );

    return(
            <SafeAreaView>
                <FlatList
                    ListHeaderComponent={<HeaderUsers/>}
                    keyExtractor={item => String(item.id)}
                    data={dadosUser}
                    renderItem={({ item }) => (
                        <UserList
                        id={item.id}
                        nome={item.nome}
                        email={item.email.slice(0, 21)}
                        grupo={item.grupo}
                        />
                    )}
                />

            </SafeAreaView>
    )
}

export default Docentes