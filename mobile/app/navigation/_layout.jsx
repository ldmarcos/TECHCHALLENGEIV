import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import PostagensScreen from './postagens'; 
import UsuariosScreen from './usuarios'; 
import PerfilScreen from './perfil';
import LoginScreen from './login'
import { Image } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const {token} = useContext(AuthContext)
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FBED51',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#2579E7',
            height: 55,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/icons/home.png')}
                style={{ tintColor: color, width: size, height: size }}
              />
            ),
          }}
        />
      {token &&(
        <>
        <Tab.Screen
        name="Postagens"
        component={PostagensScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/icons/posts.png')} // Seu ícone de postagens
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Usuarios"
        component={UsuariosScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../assets/icons/users.png')} // Seu ícone de usuários
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
      />
      </>
      )}
      {token ?(
        <>
          <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/icons/profile.png')} // Seu ícone de perfil
                style={{ tintColor: color, width: size, height: size }}
              />
            ),
          }}
        />
        </>
      ) : (
        <>
         <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/icons/login.png')} // Seu ícone de perfil
                style={{ tintColor: color, width: size, height: size }}
              />
            ),
          }}
        />
        </>
      )
      }

      </Tab.Navigator>
  );
}
