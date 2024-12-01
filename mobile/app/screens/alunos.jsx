import { View, Text, SafeAreaView, FlatList } from "react-native"
import Header from "../../components/Header"
import { useState, useCallback, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
import UserList from "../../components/UserList";
import { useFocusEffect } from "@react-navigation/native";
import HeaderUsers from "../../components/HeaderUsers";
import { BASE_URL } from '@env';
const Alunos = () => {
    const [dadosUser, setDadosUser] = useState([]);
    const {token} = useContext(AuthContext);
    useFocusEffect(
        useCallback(() => {
          const fetchUsers = async () => {
            try {
              const url = `${BASE_URL}/api/usuarios?grupo=Alunos`
              const res = await axios.get(url, {headers:{Authorization: `Bearer ${token}`}});
              setDadosUser(res.data);
            } catch (error) {
              console.log('Erro ao buscar os usuários:', error);
            }
          };
          fetchUsers();
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

export default Alunos